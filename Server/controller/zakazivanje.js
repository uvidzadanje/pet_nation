const ZakazivanjeService = require('../service/zakazivanje');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');
const JoiValidation = require("../utils/validation");

class ZakazivanjeController
{
    static getInstance()
    {
        return ZakazivanjeController.instance || (ZakazivanjeController.instance = new ZakazivanjeController());
    }

    async get(req, res, next)
    {
        try
        {
            const zakazivanje = await ZakazivanjeService.get(req.params.id);

            return responseHelper.sendResponse(res, zakazivanje);
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async getAll(req, res, next)
    {
        try
        {
            const allZakazivanja = await ZakazivanjeService.getAll();

            return responseHelper.sendResponse(res, allZakazivanja);
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async create(req, res, next)
    {
        try
        {
            await ZakazivanjeService.create({...req.body, potrosac_id: req.potrosacID});

            return responseHelper.sendResponse(res, {message: "Uspesno dodato zakazivanje"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async update(req, res, next)
    {
        try
        {
            const zakazivanje = 
            {
                id: req.body.id,
                datum_zakazivanja: req.body.datum_zakazivanja,
                broj_sati: req.body.broj_sati
            }
            
            const isUpdated = await ZakazivanjeService.update(zakazivanje);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirano zakazivanje!'});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async validateCreate(req, res, next)
    {
        try {
            const {error} = await JoiValidation.addZakazivanjeSchema({...req.body, potrosac_id: req.potrosacID});

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error.message});

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateUpdate(req, res, next)
    {
        try {
            const {error} = await JoiValidation.updateZakazivanjeSchema(req.body);

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error.message});

            next();
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next)
    {
        try
        {
            const isDeleted = await ZakazivanjeService.delete(req.params.id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisano zakazivanje!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async getByPreduzeceSession(req, res, next)
    {
        try {
            const zakazivanja = await ZakazivanjeService.getByPreduzece(req.preduzeceID);

            return responseHelper.sendResponse(res, {zakazivanja});
        } catch (error) {
            next(error);
        }
    }

    async getByPotrosacSession(req, res, next)
    {
        try {
            const zakazivanja = await ZakazivanjeService.getByPotrosac(req.potrosacID);

            return responseHelper.sendResponse(res, {zakazivanja});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ZakazivanjeController.getInstance();