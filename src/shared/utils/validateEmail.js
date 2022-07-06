export const validateEmail = (input) => {
    // Validate email
    if (/^[a-zA-Z0-9.\-_]+@(?:[a-zA-Z0-9-]+.)+[A-Za-z]+$/.test(input)) {
        return true;
    }
    return false;
};
