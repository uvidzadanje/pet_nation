const OcenaPreduzeceService = require('../service/ocena-preduzeca');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');

class OcenaPreduzeceController
{
    static getInstance()
    {
        return OcenaPreduzeceController.instance || (OcenaPreduzeceController.instance = new OcenaPreduzeceController());
    }

    async getByPotrosacSession(req, res, next)
    {
        try {
            const ocena = await OcenaPreduzeceService.getByPotrosacID(req.potrosacID, req.params.id);

            return responseHelper.sendResponse(res, {ocena});
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next)
    {
        try
        {
            const ocenaPreduzece = await OcenaPreduzeceService.get(req.params.id);

            return responseHelper.sendResponse(res, ocenaPreduzece);
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
            const allOcenePreduzece = await OcenaPreduzeceService.getAll();

            return responseHelper.sendResponse(res, allOcenePreduzece);
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
            await OcenaPreduzeceService.create({ocena: req.body.ocena, potrosac_id: req.potrosacID, preduzece_id: req.body.preduzece_id});

            return responseHelper.sendResponse(res, {message: "Uspesno napravljena ocena preduzeca"});
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
            const ocenaPreduzece = 
            {
                id: req.body.id,
                ocena: req.body.ocena,
                potrosac_id: req.body.potrosac_id,
                preduzece_id: req.body.preduzece_id
            }
            
            const isUpdated = await OcenaPreduzeceService.update(ocenaPreduzece);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirana ocena preduzeca!'});
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
            const isDeleted = await OcenaPreduzeceService.delete(req.params.id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisana ocena preduzeca!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
}

module.exports = OcenaPreduzeceController.getInstance();