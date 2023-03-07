const OcenaStavkaService = require('../service/ocena-stavka');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');

class OcenaStavkaController
{
    static getInstance()
    {
        return OcenaStavkaController.instance || (OcenaStavkaController.instance = new OcenaStavkaController());
    }

    async getByPotrosacSession(req, res, next)
    {
        try {
            const ocena = await OcenaStavkaService.getByPotrosacID(req.potrosacID, req.params.id);

            return responseHelper.sendResponse(res, {ocena});
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next)
    {
        try
        {
            const ocenaStavka = await OcenaStavkaService.get(req.params.id);

            return responseHelper.sendResponse(res, ocenaStavka);
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
            const allOceneStavka = await OcenaStavkaService.getAll();

            return responseHelper.sendResponse(res, allOceneStavka);
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
            await OcenaStavkaService.create({ocena: req.body.ocena, stavka_id: req.body.stavka_id, potrosac_id: req.potrosacID});

            return responseHelper.sendResponse(res, {message: "Uspesno napravljena ocena stavke"});
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
            const ocenaStavka = 
            {
                id: req.body.id,
                ocena: req.body.ocena,
            }
            
            const isUpdated = await OcenaStavkaService.update(ocenaStavka);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirana ocena stavke!'});
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
            const isDeleted = await OcenaStavkaService.delete(req.params.id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisana ocena stavke!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
}

module.exports = OcenaStavkaController.getInstance();