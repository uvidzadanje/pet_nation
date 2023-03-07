const StavkaService = require('../service/stavka');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');
const UslugaService = require("../service/usluga");
const ProizvodService = require("../service/proizvod");
const JoiValidation = require("../utils/validation");

const stavkaTypes = {
    usluga: UslugaService,
    proizvod: ProizvodService,
}

const typeValidate = {
    usluga: JoiValidation.addUslugaSchema,
    proizvod: JoiValidation.addProizvodSchema
}

class StavkaController
{
    static getInstance()
    {
        return StavkaController.instance || (StavkaController.instance = new StavkaController());
    }

    async get(req, res, next)
    {
        try
        {
            const stavka = await StavkaService.get(req.params.id);

            return responseHelper.sendResponse(res, stavka);
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
            const allStavke = await StavkaService.getAll();

            return responseHelper.sendResponse(res, allStavke);
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
            
            const stavkaType = req.body.type.toLowerCase();
            
            if(!stavkaType || !stavkaTypes[stavkaType]) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Los tip stavke!"});
            
            const stavka = await StavkaService.create({...req.body, preduzece_id: req.preduzeceID});

            const id  = await stavkaTypes[stavkaType].create({...req.body, stavka_id: stavka.id});
            
            return responseHelper.sendResponse(res, {message: "Uspesno napravljena stavka", stavka: await stavkaTypes[stavkaType].get(id)});
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
            const stavkaType = req.body.type.toLowerCase();

            const {error} = await JoiValidation.addStavkaSchema({...req.body, preduzece_id: req.preduzeceID});

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error.message});

            const {error: stavkaError} = await typeValidate[stavkaType](req.body);

            if(stavkaError) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: stavkaError.message});

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateUpdate(req, res, next)
    {
        try {
            const {error} = await JoiValidation.updateStavkaSchema(req.body);

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error.message});

            next();
        } catch (error) {
            next(error);
        }
    }


    async update(req, res, next)
    {
        try
        {
            const stavka = 
            {
                id: req.body.id,
                naziv: req.body.naziv,
                opis: req.body.opis,
                preduzece_id: req.body.preduzece_id,
                kategorija_id: req.body.kategorija_id
            }
            
            const isUpdated = await StavkaService.update(stavka);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirana stavka!'});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async delete(req, res, next)
    {
        try
        {
            const stavkaType = req.body.type.toLowerCase();

            if(!stavkaType || !stavkaTypes[stavkaType]) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Los tip stavke!"});

            await stavkaTypes[stavkaType].deleteByStavkaID(req.params.id);

            const isDeleted = await StavkaService.delete(req.params.id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisana stavka!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
}

module.exports = StavkaController.getInstance();