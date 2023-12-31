import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import LogoIcon from "../../assets/images/icons/logo.png";
import Logo from '../../components/Logo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setRememberMe } from '../../store/actions/rememberPasswordSlice';
import { RootState } from '../../store/store';
import { StyledForm, StyledFormGroup, StyledButtonWrapper, StyledLink, StyledAccountPromptWrapper, StyledPromptLink, StyledRememberWrapper, StyledRememberGroup } from '../../styles/loginSignupStyles';
import { FaGoogle } from "react-icons/fa";
import { loginApi } from '../../store/actions/loginApiSlice';
import { AppDispatch } from '../../store/store';

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required"),
    rememberMe: yup.boolean(),
});

const Login: React.FC = () => {
    const rememberMe = useSelector((state: RootState) => state.rememberPassword.rememberMe);
    const dispatch: AppDispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRememberMe(e.target.checked));
    }

    const {
        handleSubmit, 
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: FormData) => {
        dispatch(loginApi(data));
        // console.log(`Form submitted with the following data: 
        // \n\nEmail: ${data.email}
        // \nPassword: ${data.password}
        // \nRemember me: ${data.rememberMe}`);

        if (data.rememberMe) {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.password);
            localStorage.setItem('expiry', date.toString());
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Logo 
                src={LogoIcon}
                alt='logo icon'
                variant='primary-logo'
            />
            <Typography variant='primary-title'>
                Log In
            </Typography>
            <StyledFormGroup>
                <Label 
                    htmlFor='email' 
                    variant='form-label'
                >
                    Email: 
                </Label>
                <Controller 
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <Input 
                            {...field}
                            type='email'
                            placeholder='Enter your email'
                            variant='form-input'
                        />
                    )}
                />
            </StyledFormGroup>
            {errors.email && (
                <Typography variant='error-message'>
                    {errors.email.message}
                </Typography>
            )}

            <StyledFormGroup>
                <Label 
                    htmlFor='password' 
                    variant='form-label'
                >
                    Password: 
                </Label>
                <Controller 
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <>
                            <Input 
                                {...field}
                                type='password'
                                placeholder='Enter your password'
                                variant='form-input'
                            />
                        </>
                    )}
                />
            </StyledFormGroup>
            {errors.password && (
                <Typography variant='error-message'>
                    {errors.password.message}
                </Typography>
            )}

            <StyledRememberGroup>
                <Controller 
                    name='rememberMe'
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <StyledRememberWrapper>
                            <Input
                                {...field}
                                variant=''
                                name='rememberMe'
                                placeholder=''
                                value=''
                                onChange={handleInputChange}
                                type='checkbox'
                                checked={rememberMe}
                            />
                            <Label 
                                htmlFor='rememberMe' 
                                variant='remember-label'
                            >
                                Remember for 30 days
                            </Label>
                            
                        </StyledRememberWrapper>
                    )}
                />

                <StyledPromptLink to="/passwordreset">
                    Forgot password
                </StyledPromptLink>
            </StyledRememberGroup>

            <StyledButtonWrapper>
                <Button variant='submit-button'>
                    Sign in
                </Button>
                <StyledLink to="https://www.google.com/">
                    Sign in with Google
                    <FaGoogle style={{ marginLeft: "10px", scale: "1.2" }} />
                </StyledLink>
            </StyledButtonWrapper>

            <StyledAccountPromptWrapper>
                <Typography variant='login-prompt'>
                    Dont have an account? 
                    <StyledPromptLink to="/signup">
                        Sign Up
                    </StyledPromptLink>
                </Typography>
            </StyledAccountPromptWrapper>
        </StyledForm>
    );
};

export default Login;