const { compareIsAdmin } = require("../helpers/crypt");
const OcenaStavkaService = require("../service/ocena-stavka");
const { ApplicationError, httpErrorTypes } = require("../utils/error");

class OcenaStavkaMiddleware
{
    static getInstance()
    {
        return OcenaStavkaMiddleware.instance || (OcenaStavkaMiddleware.instance = new OcenaStavkaMiddleware());
    }

    async authorizedToUpdate(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();
            
            const ocena = await OcenaStavkaService.get(req.body.id);

            if(ocena.potrosac_id !== req.potrosacID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            return next();
        } catch (error) {
            next(error);
        }
    }

    async authorizedToDelete(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const ocena = await OcenaStavkaService.get(req.params.id);

            if(ocena.potrosac_id !== req.potrosacID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            return next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OcenaStavkaMiddleware.getInstance();