const StavkaService = require("../service/stavka");
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

            const stavka = await StavkaService.get(req.body.id);

            if(stavka.preduzece_id !== req.preduzeceID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }

    async authorizedToDelete(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();
            
            const stavka = await StavkaService.get(req.params.id);

            if(stavka.preduzece_id !== req.preduzeceID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProizvodMiddleware.getInstance();