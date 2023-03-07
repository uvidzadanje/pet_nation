const KategorijaService = require('../service/kategorija');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');

class KategorijaController
{
    static getInstance()
    {
        return KategorijaController.instance || (KategorijaController.instance = new KategorijaController());
    }

    async get(req, res, next)
    {
        try
        {
            const kategorija = await KategorijaService.get(req.params.id);

            return responseHelper.sendResponse(res, kategorija);
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
            const allKategorije = await KategorijaService.getAll();

            return responseHelper.sendResponse(res, allKategorije);
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async getByKategorijaID(req, res, next)
    {
        try {
            const kategorije = await KategorijaService.getAllByKategorijaID(req.params.id);
            
            return responseHelper.sendResponse(res, kategorije);
        } catch (error) {
            
        }
    }

    async create(req, res, next)
    {
        try
        {
            const kategorija = await KategorijaService.create({naziv: req.body.naziv, nadkategorija_id: req.body.nadkategorija_id});

            return responseHelper.sendResponse(res, {message: "Uspesno napravljena kategorija", kategorija});
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
            const kategorija = 
            {
                id: req.body.id,
                naziv: req.body.naziv,
                nadkategorija_id: req.body.nadkategorija_id
            }
            
            const isUpdated = await KategorijaService.update(kategorija);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirana kategorija!'});
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
            await KategorijaService.delete({nadkategorija_id: req.params.id});

            await KategorijaService.delete({id: req.params.id});

            return responseHelper.sendResponse(res, {message: "Uspesno obrisana kategorija!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async getRootCategories(req, res, next)
    {
        try {
            const kategorije = await KategorijaService.getRootCategories();

            return responseHelper.sendResponse(res, kategorije);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = KategorijaController.getInstance();