const KorpaService = require("../service/korpa");
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

            const potrosac = await PotrosacService.getByUserID(req.user.id);

            if(!potrosac) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            const korpa = await KorpaService.get(req.body.id);

            if(potrosac.id !== korpa.potrosac_id) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }

    async authorizedToDelete(req, res, next)
    {
        try {
            if(await compareIsAdmin(req.user.type)) return next();

            const potrosac = await PotrosacService.getByUserID(req.user.id);

            if(!potrosac) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            const korpa = await KorpaService.get(req.params.id);

            if(potrosac.id !== korpa.potrosac_id) throw new ApplicationError(httpErrorTypes.FORBIDDEN);

            next();
        } catch (error) {
            next(error);
        }
    }

    // async authorizedToGet(req, res, next)
    // {
    //     try {
    //         if(await compareIsAdmin(req.user.type)) return next();

    //         const korisnik = await PotrosacService.getByUserID(req.user.id);

    //         if(korisnik)
    //         {
    //             if(korisnik.id === req.params.id)
    //             {
    //                 return next();
    //             }
    //         }
    //         else
    //         {
    //             korisnik = await PreduzeceService.getByUserID(req.user.id);

    //             if(korisnik)
    //             {
    //                 const prozivodi = await KupovinaService.getByKorpaID(req.params.id)
    //                                     .map(kupovina => kupovina.Proizvod)
    //                                     .filter(prozivod => prozivod.preduzece_id === korisnik.id);
                    
    //                 if(prozivodi.length !== 0) return next();
    //             }
    //         }

    //         throw new ApplicationError(httpErrorTypes.FORBIDDEN);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

module.exports = KorpaMiddleware.getInstance();