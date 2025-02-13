class ApiError extends Error {
    constructor(statusCode, message="Something went wrong", error=null) {
        super(message)

        this.statusCode = statusCode
        this.data = null
        this.error = error
        this.success = false
    }
}

export default ApiError