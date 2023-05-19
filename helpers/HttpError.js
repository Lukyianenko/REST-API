class HttpError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
      }
    
    getError() {
        const error = new Error(this.message);
        error.status = this.status;
        return error;
    }
}

module.exports = HttpError;