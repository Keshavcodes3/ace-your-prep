export class ApiError {
    success: boolean;
    message: string;
    statusCode: number;
    errorCode?: string;
    data: null;
    timestamp: string;

    constructor(
        message = "Something went wrong",
        statusCode = 500,
        errorCode?: string
    ) {
        this.success = false;
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode || '500';
        this.data = null;
        this.timestamp = new Date().toISOString();
    }
}