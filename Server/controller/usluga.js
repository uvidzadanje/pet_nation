const UslugaService = require('../service/usluga');
const StavkaService = require("../service/stavka");
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');
const JoiValidation = require("../utils/validation");

class UslugaController
{
    static getInstance()
    {
        return UslugaController.instance || (UslugaController.instance = new UslugaController());
    }

    async get(req, res, next)
    {
        try
        {
            const usluga = await UslugaService.get(req.params.id);

            return responseHelper.sendResponse(res, usluga);
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
            const usluge = await UslugaService.getByPreduzece(req.preduzeceID);

            return responseHelper.sendResponse(res, {usluge: usluge});
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next)
    {
        try
        {
            const allUsluge = await UslugaService.getAll();

            return responseHelper.sendResponse(res, allUsluge);
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
            const usluga = 
            {
                id: req.body.id,
                cena_po_satu: req.body.cena_po_satu
            }
            
            const isUpdated = await UslugaService.update(usluga);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirana usluga!'});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async validateUpdate(req, res, next)
    {
        try {
            const {error} = await JoiValidation.updateUslugaSchema(req.body);

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
            const {stavka_id} = await UslugaService.get(req.params.id);

            const isDeleted = await UslugaService.delete(req.params.id);

            await StavkaService.delete(stavka_id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisana usluga!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async getAllByFilters(req, res, next)
    {
        try {
            const usluge = await UslugaService.getAllByFilters(req.query);

            return responseHelper.sendResponse(res, {usluge});
        } catch (error) {
            next(error);
        }
    }

    async getByPreduzece(req, res, next)
    {
        try {
            const usluge = await UslugaService.getByPreduzece(req.params.id);

            return responseHelper.sendResponse(res, {usluge: usluge});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UslugaController.getInstance();