export default function AuthErrorMessage(code: string) {
    switch (code) {
        case "auth/invalid-email":
            return "Invalid email address entered please check for misspelling.";
        case "auth/user-disabled":
            return "Unfortunately your account has been disabled by the application administrator.";
        case "auth/user-not-found":
            return "No account found use the register tab to get started.";
        case "auth/wrong-password":
            return "Incorrect password if needed use the Password Reset link.";
        case "auth/network-request-failed":
            return "Unable to connect to server please check your network connection.";

        default:
            return "Problem logging in, please try again later."
    }
}