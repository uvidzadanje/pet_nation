const KupovinaService = require('../service/kupovina');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');

class KupovinaController
{
    static getInstance()
    {
        return KupovinaController.instance || (KupovinaController.instance = new KupovinaController());
    }

    async get(req, res, next)
    {
        try
        {
            const kupovina = await KupovinaService.get(req.params.id);

            return responseHelper.sendResponse(res, kupovina);
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
            const allKupovine = await KupovinaService.getAll();

            return responseHelper.sendResponse(res, allKupovine);
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
            await KupovinaService.create({korpa_id: req.body.korpa_id, proizvod_id: req.body.proizvod_id, kolicina: req.body.kolicina});

            return responseHelper.sendResponse(res, {message: "Uspesno napravljena kupovina"});
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
            const kupovina = 
            {
                id: req.body.id,
                kolicina: req.body.kolicina
            }
            
            const isUpdated = await KupovinaService.update(kupovina);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirana kupovina!'});
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
            const isDeleted = await KupovinaService.delete({id: req.params.id});

            return responseHelper.sendResponse(res, {message: "Uspesno obrisana kupovina!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async getByKorpaID(req, res, next)
    {
        try {
            const kupovine = await KupovinaService.getByKorpaID(req.params.id);

            return responseHelper.sendResponse(res, {kupovine});
        } catch (error) {
            next(next);
        }
    }
}

module.exports = KupovinaController.getInstance();