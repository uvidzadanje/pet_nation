const KorpaService = require('../service/korpa');
const KupovinaService = require("../service/kupovina");
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');
const JoiValidation = require("../utils/validation");

class KorpaController
{
    static getInstance()
    {
        return KorpaController.instance || (KorpaController.instance = new KorpaController());
    }

    async get(req, res, next)
    {
        try
        {
            const korpa = await KorpaService.get(req.params.id);

            return responseHelper.sendResponse(res, korpa);
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
            const allKorpe = await KorpaService.getAll();

            return responseHelper.sendResponse(res, allKorpe);
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
            const korpa = await KorpaService.create({...req.body, potrosac_id: req.potrosacID});

            return responseHelper.sendResponse(res, {message: "Uspesno napravljena korpa", id: korpa.id});
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
            const korpa = 
            {
                id: req.body.id,
                adresa_isporuke: req.body.adresa_isporuke,
                poslato_kuriru: req.body.poslato_kuriru
            }
            
            const isUpdated = await KorpaService.update(korpa);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirana korpa!'});
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
            const {error} = await JoiValidation.addKorpaSchema({...req.body, potrosac_id: req.potrosacID});

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error.message});

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateUpdate(req, res, next)
    {
        try {
            const {error} = await JoiValidation.updateKorpaSchema(req.body);

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
            await KupovinaService.delete({korpa_id: req.params.id});

            const isDeleted = await KorpaService.delete(req.params.id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisana korpa!"});
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
            const korpe = await KorpaService.getByPreduzece(req.preduzeceID);

            return responseHelper.sendResponse(res, {korpe});
        } catch (error) {
            next(error);
        }
    }

    async getByPotrosacSession(req, res, next)
    {
        try {
            const korpe = await KorpaService.getByPotrosac(req.potrosacID);

            return responseHelper.sendResponse(res, {korpe});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = KorpaController.getInstance();