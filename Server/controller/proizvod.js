const ProizvodService = require('../service/proizvod');
const StavkaService = require("../service/stavka");
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');
const JoiValidation = require("../utils/validation");

class ProizvodController
{
    static getInstance()
    {
        return ProizvodController.instance || (ProizvodController.instance = new ProizvodController());
    }

    async get(req, res, next)
    {
        try
        {
            const proizvod = await ProizvodService.get(req.params.id);

            return responseHelper.sendResponse(res, proizvod);
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
            const proizvodi = await ProizvodService.getByPreduzece(req.preduzeceID);

            return responseHelper.sendResponse(res, {proizvodi});
        } catch (error) {
            next(error);
        }
    }

    async getByPreduzece(req, res, next)
    {
        try {
            const proizvodi = await ProizvodService.getByPreduzece(req.params.id);

            return responseHelper.sendResponse(res, {proizvodi});
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next)
    {
        try
        {
            const allProizvodi = await ProizvodService.getAll();

            return responseHelper.sendResponse(res, allProizvodi);
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
            const proizvod = 
            {
                id: req.body.id,
                cena: req.body.cena,
                naziv_proizvodjaca: req.body.naziv_proizvodjaca,
                zemlja_porekla: req.body.zemlja_porekla
            }
            
            const isUpdated = await ProizvodService.update(proizvod);

            return responseHelper.sendResponse(res, {message: 'Uspesno azuriran proizvod!'});
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
            const {error} = await JoiValidation.updateProizvodSchema(req.body);

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error.message});

            next();
        } catch (error) {
            next(error);
        }
    }

    async getAllByFilters(req, res, next)
    {
        try {
            const proizvodi = await ProizvodService.getAllByFilters(req.query);

            return responseHelper.sendResponse(res, {proizvodi});
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next)
    {
        try
        {
            const {stavka_id} = await ProizvodService.get(req.params.id);

            const isDeleted = await ProizvodService.delete(req.params.id);

            await StavkaService.delete(stavka_id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisan proizvod!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
}

module.exports = ProizvodController.getInstance();