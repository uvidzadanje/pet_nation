const ZakazivanjeService = require("../service/zakazivanje");
const PotrosacService = require("../service/potrosac");
const PreduzeceService = require("../service/preduzece");
const KupovinaService = require("../service/kupovina");
const {compareIsAdmin} = require("../helpers/crypt");
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class KorpaMiddleware
{
    static getInstance()
    {
        return KorpaMiddleware.instance || (KorpaMiddleware.instance = new KorpaMiddleware());
    }

    async authorizedToUpdate(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const zakazivanje = await ZakazivanjeService.get(req.body.id);

            if(req.potrosacID !== zakazivanje.potrosac_id) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }

    async authorizedToDelete(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const zakazivanje = await ZakazivanjeService.get(req.params.id);

            if(req.potrosacID !== zakazivanje.potrosac_id) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = KorpaMiddleware.getInstance();