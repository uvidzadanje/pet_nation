const { compareIsAdmin } = require("../helpers/crypt");
const OcenaPreduzeceService = require("../service/ocena-preduzeca");
const { ApplicationError, httpErrorTypes } = require("../utils/error");

class OcenaPreduzeceMiddleware
{
    static getInstance()
    {
        return OcenaPreduzeceMiddleware.instance || (OcenaPreduzeceMiddleware.instance = new OcenaPreduzeceMiddleware());
    }

    async authorizedToUpdate(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const ocena = await OcenaPreduzeceService.get(req.body.id);

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

            const ocena = await OcenaPreduzeceService.get(req.params.id);

            if(ocena.potrosac_id !== req.potrosacID) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            return next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OcenaPreduzeceMiddleware.getInstance();