const { compareIsAdmin, compareIsPreduzece } = require("../helpers/crypt");
const StavkaSlikaService = require("../service/stavka-slika");
const StavkaService = require("../service/stavka");
const {ApplicationError, httpErrorTypes} = require("../utils/error");

class StavkaSlikaMiddleware
{
    static getInstance()
    {
        return StavkaSlikaMiddleware.instance || (StavkaSlikaMiddleware.instance = new StavkaSlikaMiddleware());
    }

    async authorizedToCreate(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const stavka = await StavkaService.get(req.body.stavka_id);

            if(req.preduzeceID === stavka.preduzece_id) return next();

            throw new ApplicationError(httpErrorTypes.FORBIDDEN);
        } catch (error) {
            next(error);
        }
    }

    async authorizedToDelete(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const slika = await StavkaSlikaService.get(req.params.id);

            const stavka = await StavkaService.get(slika.stavka_id);

            if(req.preduzeceID === stavka.preduzece_id) return next();

            throw new ApplicationError(httpErrorTypes.FORBIDDEN);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StavkaSlikaMiddleware.getInstance();