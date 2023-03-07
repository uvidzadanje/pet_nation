const KupovinaService = require("../service/kupovina");
const KorpaService = require("../service/korpa");
const {compareValues, compareIsAdmin} = require("../helpers/crypt");
const {ApplicationError, httpErrorTypes} = require("../utils/error");

class KupovinaMiddleware
{
    static getInstance()
    {
        return KupovinaMiddleware.instance || (KupovinaMiddleware.instance = new KupovinaMiddleware());
    }

    async authorizedToUpdate(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const {korpa_id} = await KupovinaService.get(req.body.id);
            console.log(korpa_id);

            const {potrosac_id} = await KorpaService.get(korpa_id);

            if(potrosac_id === req.potrosacID) return next();

            throw new ApplicationError(httpErrorTypes.FORBIDDEN);
        } catch (error) {
            next(error);
        }
    }

    async authorizedToDelete(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const {korpa_id} = await KupovinaService.get(req.params.id);

            const {potrosac_id} = await KorpaService.get(korpa_id);

            if(potrosac_id === req.potrosacID) return next();

            throw new ApplicationError(httpErrorTypes.FORBIDDEN);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = KupovinaMiddleware.getInstance();