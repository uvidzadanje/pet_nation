const PotrosacService = require("../service/potrosac");
const {compareIsAdmin} = require("../helpers/crypt");
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class PotrosacMiddleware
{
    static getInstance()
    {
        return PotrosacMiddleware.instance || (PotrosacMiddleware.instance = new PotrosacMiddleware());
    }

    async isPotrosac(req, res, next)
    {
        try {
            const { id } = await PotrosacService.getByUserID(req.user.id);

            if(!id) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            req.potrosacID = id;

            next();
        } catch (error) {
            next(error);
        }
    }

    async isPotrosacOrAdmin(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const { id } = await PotrosacService.getByUserID(req.user.id);

            if(!id) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            req.potrosacID = id;

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PotrosacMiddleware.getInstance();