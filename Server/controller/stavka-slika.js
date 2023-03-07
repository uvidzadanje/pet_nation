const StavkaSlikaService = require('../service/stavka-slika');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const responseHelper = require('../helpers/response');

class StavkaSlikaController
{
    static getInstance()
    {
        return StavkaSlikaController.instance || (StavkaSlikaController.instance = new StavkaSlikaController());
    }

    async get(req, res, next)
    {
        try
        {
            const stavkaSlika = await StavkaSlikaService.get(req.params.id);

            return responseHelper.sendResponse(res, stavkaSlika);
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }

    async getByStavka(req, res, next)
    {
        try {
            const slike = await StavkaSlikaService.getByStavka(req.params.id);

            return responseHelper.sendResponse(res, {slike});
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next)
    {
        try
        {
            const allStavkaSlika = await StavkaSlikaService.getAll();

            return responseHelper.sendResponse(res, allStavkaSlika);
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
            const slika = await StavkaSlikaService.create({slika_link: "/"+req.file.path, stavka_id: req.body.stavka_id});

            return responseHelper.sendResponse(res, {message: "Uspesno napravljena slika stavke", nova_slika: slika});
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
            const stavkaSlika = 
            {
                id: req.body.id,
                slika_link: req.body.slika_link,
                stavka_id: req.body.stavka_id
            }
            
            const isUpdated = await StavkaSlikaService.update(stavkaSlika);

            return responseHelper.sendResponse(res, {message: 'Uspesno azurirana slika stavke!'});
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
            const isDeleted = await StavkaSlikaService.delete(req.params.id);

            return responseHelper.sendResponse(res, {message: "Uspesno obrisana slika stavke!"});
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
}

module.exports = StavkaSlikaController.getInstance();