const ProizvodService = require("../service/proizvod");
const { ApplicationError, httpErrorTypes } = require("../utils/error");
const { compareIsAdmin } = require("../helpers/crypt");

class ProizvodMiddleware
{
    static getInstance()
    {
        return ProizvodMiddleware.instance || (ProizvodMiddleware.instance = new ProizvodMiddleware());
    }

    async authorizedToUpdate(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const proizvod = await ProizvodService.get(req.body.id);

            if(proizvod.Stavka.preduzece_id !== req.preduzeceID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }

    async authorizedToDelete(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();
            
            const proizvod = await ProizvodService.get(req.params.id);

            if(proizvod.Stavka.preduzece_id !== req.preduzeceID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProizvodMiddleware.getInstance();