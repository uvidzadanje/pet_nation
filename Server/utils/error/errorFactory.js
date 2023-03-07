const ApplicationError = require("./applicationError");
const httpErrorTypes = require("./httpErrorTypes");

function createError(error) { 
    return new ApplicationError(httpErrorTypes.INTERNAL_SERVER_ERROR);
}

module.exports = createError;