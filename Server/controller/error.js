const { ApplicationError, httpErrorTypes, createError } = require("../utils/error/");
const { formatError, sendResponse } = require("../helpers/response");

class ErrorController
{
    static getInstance()
    {
        return ErrorController.instance || (ErrorController.instance = new ErrorController());
    }
    
    errorHandler(err, req, res, next) {
        if (err instanceof ApplicationError) {
            const code = err.statusCode || 500
            return res.status(code).json(formatError(err))
        }
        
        if (err instanceof Error) {
            console.log(err);
            const newError = createError(err);
            const code = newError.statusCode || 500
            return res.status(code).json(formatError(newError))
        }
        
        const unknownError = new ApplicationError(httpErrorTypes.UNKNOWN_ERROR);
        
        return sendResponse(res, unknownError, statusCode);
    }
}

module.exports = ErrorController.getInstance();