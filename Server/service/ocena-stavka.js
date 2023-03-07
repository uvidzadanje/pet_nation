const {OcenaStavka, Stavka, Potrosac} = require('../model/models');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class OcenaStavkaService
{
    async getByPotrosacID(potrosacID, stavkaID)
    {
        const oneOcenaStavka = await OcenaStavka.findOne(
            {
                where:
                {
                    potrosac_id: potrosacID,
                    stavka_id: stavkaID
                }
            });
            
        if(oneOcenaStavka) 
            return oneOcenaStavka; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async get(id)
    {
        const oneOcenaStavka = await OcenaStavka.findOne(
            {
                where:
                {
                    id: id
                }
            });
        if(oneOcenaStavka) 
            return oneOcenaStavka; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getAll()
    {
        let allOceneStavka = await OcenaStavka.findAll();
        if(allOceneStavka)
            return allOceneStavka;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(ocenaStavka)
    {
        if(!ocenaStavka.ocena || !ocenaStavka.stavka_id || !ocenaStavka.potrosac_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message:'Neispravni podaci!'});

        if(ocenaStavka.ocena < 1 || ocenaStavka.ocena > 5) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message:'Ocena mora biti od 1 do 5!'});

        const newOcenaStavka = await OcenaStavka.create(
            {
                ocena: ocenaStavka.ocena,
                stavka_id: ocenaStavka.stavka_id,
                potrosac_id: ocenaStavka.potrosac_id
            });
        if(newOcenaStavka)
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom kreiranja ocene stavke!'});
    }

    async update(ocenaStavka)
    {
        if(!ocenaStavka.ocena || !ocenaStavka.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: 'Neispravni podaci!'});
        
        if(ocenaStavka.ocena < 1 || ocenaStavka.ocena > 5) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message:'Ocena mora biti od 1 do 5!'});
        
        const [rows, update] = await OcenaStavka.update(
            {
                ocena: ocenaStavka.ocena,
            },
            {
                where:
                {
                    id: ocenaStavka.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom promene ocene stavke!'});
    }

    async delete(id)
    {
        const deleteOcenaStavka = await OcenaStavka.destroy(
            {
                where:
                {
                    id: id
                }
            });
        if(deleteOcenaStavka === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom brisanja ocene stavka!'});
    }

    static getInstance()
    {
        return OcenaStavkaService.instance || (OcenaStavka.instance = new OcenaStavkaService());
    }
}

module.exports = OcenaStavkaService.getInstance();