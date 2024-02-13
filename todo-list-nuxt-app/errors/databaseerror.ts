class DatabaseError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

class TaskNotFoundError extends DatabaseError {
    constructor(message: string) {
        super(message, 'NOT_FOUND');
    }
}

class TableNotFoundError extends DatabaseError {
    constructor(message: string) {
        super(message, 'ER_NO_SUCH_TABLE');
    }
}

class UnhandledError extends DatabaseError {
    constructor(message: string) {
        super(message, 'UNHANDLED_ERROR');
    }
}

export { DatabaseError, TaskNotFoundError, TableNotFoundError, UnhandledError };