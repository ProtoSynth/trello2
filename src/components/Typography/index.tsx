import React from "react";
import { StyledPrimaryTitle, StyledErrorMessge, StyledSuccessMessage, StyledLoginPrompt, StyledPassValidationMesasges, StyledSubTitle, StyledNavbarText, StyledNotificationText, StyledBracketText, StyledProfileOptionsText, StyledCardTitle, StyledCardBodyText, StyledCardSubText } from "./typographyStyles";

const variantClassMap:  Record<string, string> = {
    "primary-title": "primary-title",
    "error-message": "error-message",
    "success-message": "success-message",
    "login-prompt": "login-prompt",
    "pass-validation-message": "pass-validation-message",
    "sub-title": "sub-title",
    "navbar-text": "navbar-text",
    "notification-text": "notification-text",
    "bracket-text": "bracket-text",
    "profile-options-text": "profile-options-text",
    "card-title": "card-title",
    "card-body-text": "card-body-text",
    "card-sub-text": "card-sub-text",
};

interface TypographyProps {
    variant: keyof typeof variantClassMap;
    children: React.ReactNode;
    style?: React.CSSProperties;
    smallFont?: boolean;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, style, smallFont }) => {
    let StyledTypography;

    switch(variant) {
        case 'primary-title':
            StyledTypography = StyledPrimaryTitle;
            break;
        case 'sub-title': 
            StyledTypography = StyledSubTitle;
            break;
        case 'error-message':
            StyledTypography = StyledErrorMessge;
            break;
        case 'success-message':
            StyledTypography = StyledSuccessMessage;
            break;
        case 'login-prompt':
            StyledTypography = StyledLoginPrompt;
            break;
        case 'pass-validation-message':
            StyledTypography = StyledPassValidationMesasges;
            break;
        case 'navbar-text':
            StyledTypography = StyledNavbarText;
            break;
        case 'notification-text':
            StyledTypography = StyledNotificationText;
            break;
        case 'bracket-text':
            StyledTypography = StyledBracketText;
            break;
        case 'profile-options-text':
            StyledTypography = StyledProfileOptionsText;
            break;
        case 'card-title':
            StyledTypography = StyledCardTitle;
            break;
        case 'card-body-text':
            StyledTypography = StyledCardBodyText;
            break;
        case 'card-sub-text':
            StyledTypography = StyledCardSubText;
            break;
        default:
            return null;
    }

    return (
        <StyledTypography 
            style={style}
            smallFont={smallFont}
        >
            {children}
        </StyledTypography>
    );
};

export default Typography;