const {OcenaPreduzece, Potrosac, Preduzece} = require('../model/models');
const { ApplicationError, httpErrorTypes } = require('../utils/error');

class OcenaPreduzeceService
{

    async getByPotrosacID(potrosacID, preduzeceID)
    {
        const oneOcenaPreduzeca = await OcenaPreduzece.findOne(
            {
                where:
                {
                    potrosac_id: potrosacID,
                    preduzece_id: preduzeceID
                }
            });
            
        if(oneOcenaPreduzeca) 
            return oneOcenaPreduzeca; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async get(id)
    {
        const oneOcenaPreduzeca = await OcenaPreduzece.findOne(
            {
                where:
                {
                    id: id
                }
                // include ako treba jos nesto da se vrati
            });
        if(oneOcenaPreduzeca) 
            return oneOcenaPreduzeca; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getAll()
    {
        let allOcenePreduzeca = await OcenaPreduzece.findAll();
        if(allOcenePreduzeca)
            return allOcenePreduzeca;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(ocenaPreduzeca)
    {
        if(!ocenaPreduzeca.ocena || !ocenaPreduzeca.potrosac_id || !ocenaPreduzeca.preduzece_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: 'Neispravni podaci!'});

        if(ocenaPreduzeca.ocena < 1 && ocenaPreduzeca.ocena > 5)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Ocena mora biti od 1 do 5!"});
        
        const newOcenaPreduzeca = await OcenaPreduzece.create(
            {
                ocena: ocenaPreduzeca.ocena,
                potrosac_id: ocenaPreduzeca.potrosac_id,
                preduzece_id: ocenaPreduzeca.preduzece_id
            });
        if(newOcenaPreduzeca)
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom kreiranja ocene preduzeca!'});
    }

    async update(ocenaPreduzeca)
    {
        if(!ocenaPreduzeca.ocena || !ocenaPreduzeca.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: 'Neispravni podaci!'});

        if(ocenaPreduzeca.ocena < 1 && ocenaPreduzeca.ocena > 5)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Ocena mora biti od 1 do 5!"});

        const [rows, update] = await OcenaPreduzece.update(
            {
                ocena: ocenaPreduzeca.ocena,
            },
            {
                where:
                {
                    id: ocenaPreduzeca.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom promene ocene preduzeca!'});
    }

    async delete(id)
    {
        const deleteOcenaPreduzeca = await OcenaPreduzece.destroy(
            {
                where:
                {
                    id: id
                }
            });
        if(deleteOcenaPreduzeca === 1)
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom brisanja ocene preduzeca!'});
    }

    static getInstance()
    {
        return OcenaPreduzeceService.instance || (OcenaPreduzeceService.instance = new OcenaPreduzeceService());
    }
}

module.exports = OcenaPreduzeceService.getInstance();