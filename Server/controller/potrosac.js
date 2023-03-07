const PotrosacService = require('../service/potrosac');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');

class PotrosacController
{
    static getInstance()
    {
        return PotrosacController.instance || (PotrosacController.instance = new PotrosacController());
    }

    async getBySession(req, res, next)
    {
        try {
            const potrosac = await PotrosacService.get(req.potrosacID);

            return responseHelper.sendResponse(res, {potrosac});
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next)
    {
        try
        {
            const potrosac = await PotrosacService.get(req.params.id);

            return responseHelper.sendResponse(res, potrosac);
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
            const allPotrosaci = await PotrosacService.getAll();

            return responseHelper.sendResponse(res, allPotrosaci);
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
    
    async updateBySession(req, res, next)
    {
        try {
            await PotrosacService.update({...req.body, id: req.potrosacID});

            return responseHelper.sendResponse(res, {message: "Uspesne izmene"});
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next)
    {
        try
        {
            const potrosac = 
            {
                id: req.params.id,
                ime: req.body.ime,
                prezime: req.body.prezime,
                broj_telefona: req.body.broj_telefona
            }
            
            const isUpdated = await PotrosacService.update(potrosac);

            return responseHelper.sendResponse(res, {message: 'Uspesno azuriran potrosac!'});
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
            const isDeleted = await PotrosacService.delete(req.params.id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisan potrosac!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
}

module.exports = PotrosacController.getInstance();