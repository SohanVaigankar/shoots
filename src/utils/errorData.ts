export enum ERROR_TYPE {
    UNAUTHORIZED = "UNAUTHORIZED",
        NOT_FOUND = "NOT_FOUND",
        INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export const ERROR_MESSAGES = {
    UNAUTHORIZED: {
        message: "User not logged in or is unauthorized to access this page",
    },
    NOT_FOUND: {
        message: "Requested data was not found",
    },
    INTERNAL_SERVER_ERROR: {
        message: "Internal Server Error",
    },
};
