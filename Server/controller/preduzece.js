const PreduzeceService = require('../service/preduzece');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');

class PreduzeceController
{
    static getInstance()
    {
        return PreduzeceController.instance || (PreduzeceController.instance = new PreduzeceController());
    }

    async get(req, res, next)
    {
        try
        {
            const preduzece = await PreduzeceService.get(req.params.id);

            return responseHelper.sendResponse(res, preduzece);
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async getBySession(req, res, next)
    {
        try {
            const preduzece = await PreduzeceService.get(req.preduzeceID);

            return responseHelper.sendResponse(res, {preduzece});
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next)
    {
        try
        {
            const allPreduzeca = await PreduzeceService.getAll();

            return responseHelper.sendResponse(res, allPreduzeca);
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
            await PreduzeceService.update({...req.body, id: req.preduzeceID});

            return responseHelper.sendResponse(res, {message: "Uspesne izmene"});
        } catch (error) {
            next(error);
        }
    }

    async updateProfileImage(req, res, next)
    {
        try {
            await PreduzeceService.updateImage({id: req.preduzeceID || req.body.id, profilna_slika_link: "/"+req.file.path});

            return responseHelper.sendResponse(res, {message: "Uspesno promenjena slika!"});
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next)
    {
        try
        {
            const preduzece = 
            {
                id: req.params.id,
                naziv: req.body.naziv,
                lokacija: req.body.lokacija,
                opis: req.body.opis
            }
            
            const isUpdated = await PreduzeceService.update(preduzece);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirano preduzece!'});
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
            const isDeleted = await PreduzeceService.delete(req.params.id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisano preduzece!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
}

module.exports = PreduzeceController.getInstance();