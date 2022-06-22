export const AUTH_CODES = {
    EMAIL_EXISTS: "auth/email-already-in-use",
    INVALID_EMAIL: "auth/invalid-email",
    WRONG_PASS: "auth/wrong-password",
    WEAK_PASS: "auth/weak-password",
    TOO_MANY_REQ: "auth/too-many-requests",
};

export const AUTH_ALERTS = {
    [AUTH_CODES.INVALID_EMAIL]: {
        title: "The given email is invalid",
        description: "The email address is badly formatted",
    },
    [AUTH_CODES.WRONG_PASS]: {
        title: "The given password is invalid",
        description: "Email / password pair doesn't match",
    },
    [AUTH_CODES.WEAK_PASS]: {
        title: "The given password is invalid",
        description: "Password should be at least 6 characters",
    },
    [AUTH_CODES.TOO_MANY_REQ]: {
        title: "We have blocked all requests from this device due to unusual activity.",
        description:
            "Try again later. Access to this account has been temporarily disabled due to many failed login attempts.",
    },
    DEFAULT: {
        title: "Unknow Error.",
        description: "Try again later.",
    },
};
