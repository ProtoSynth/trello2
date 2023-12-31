import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignupError {
    message: string;
}

interface SignupState {
    user: any;
    loading: 'idle' | 'pending';
    error: SignupError | null;
}

const initialState: SignupState = {
    user: null,
    loading: 'idle',
    error: null
};

type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type ApiError = {
    response: {
        data: SignupError;
    };
};

export const signupApi = createAsyncThunk<any, FormData, {
rejectValue: SignupError }>(
    'users/signup',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('', {
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupApi.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(signupApi.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = 'idle',
            state.user = action.payload;
        });
        builder.addCase(signupApi.rejected, (state, action: PayloadAction<SignupError | null | undefined>) => {
            state.loading = 'idle';
            state.error = action.payload || null;
        });
    }
});

export default signupSlice.reducer;