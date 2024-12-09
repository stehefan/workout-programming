export class ActionError extends Error {
    constructor(cause: ActionErrorType, message?: string) {
        super(message);
    }
}

export enum ActionErrorType {
    ValidationError = 'ValidationError',
    DatabaseError = 'DatabaseError',
    AuthenticationError = 'AuthenticationError',
}