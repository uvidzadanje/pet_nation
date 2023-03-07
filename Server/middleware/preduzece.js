const PreduzeceService = require("../service/preduzece");
const {compareIsAdmin} = require("../helpers/crypt");

class PreduzeceMiddleware
{
    static getInstance()
    {
        return PreduzeceMiddleware.instance || (PreduzeceMiddleware.instance = new PreduzeceMiddleware());
    }

    async isPreduzece(req, res, next)
    {
        try {
            const { id } = await PreduzeceService.getByUserID(req.user.id);

            if(!id) throw new ApplicationError(httpErrorTypes.FORBIDDEN);
            
            req.preduzeceID = id;

            next();
        } catch (error) {
            next(error);
        }
    }
    async isPreduzeceOrAdmin(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();
            
            const { id } = await PreduzeceService.getByUserID(req.user.id);

            if(!id) throw new ApplicationError(httpErrorTypes.FORBIDDEN);
            
            req.preduzeceID = id;

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PreduzeceMiddleware.getInstance();