const UslugaService = require("../service/usluga");
const { ApplicationError, httpErrorTypes } = require("../utils/error");
const { compareIsAdmin } = require("../helpers/crypt");

class UslugaMiddleware
{
    static getInstance()
    {
        return UslugaMiddleware.instance || (UslugaMiddleware.instance = new UslugaMiddleware());
    }

    async authorizedToUpdate(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const usluga = await UslugaService.get(req.body.id);

            if(usluga.Stavka.preduzece_id !== req.preduzeceID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }

    async authorizedToDelete(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();
            
            const usluga = await UslugaService.get(req.params.id);

            if(usluga.Stavka.preduzece_id !== req.preduzeceID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UslugaMiddleware.getInstance();