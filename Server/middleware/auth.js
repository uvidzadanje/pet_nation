const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const {encodeToken} = require("../helpers/jwt");
const {sendResponse} = require("../helpers/response");
const {compareValues, compareIsAdmin} = require("../helpers/crypt");

class AuthMiddleware
{
    static getInstance()
    {
        return AuthMiddleware.instance || (AuthMiddleware.instance = new AuthMiddleware());
    }

    async isAuthentificated(req, res, next)
    {
        try {
            let token = req.cookies.token;
    
            if(!token) throw new ApplicationError(httpErrorTypes.UNAUTHORIZED);

            const verify = encodeToken(token);

            if(!verify) throw new ApplicationError(httpErrorTypes.UNAUTHORIZED);

            const {id, type} = verify;
            req.user = {id, type};

            return next();
        } catch (error) {
            next(error);
        }
    }

    async isAdmin(req, res, next)
    {
        try {
            const isAdmin = await compareIsAdmin(req.user.type);

            if(!isAdmin) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            return next();
        } catch (error) {
            next(error);
        }
    }

    async isAuthorized(req, res, next)
    {
        try {
            // treba da se dovrsi
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthMiddleware.getInstance();