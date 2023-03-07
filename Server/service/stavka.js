const {Stavka, Preduzece, Kategorija} = require('../model/models');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class StavkaService
{
    async get(id)
    {
        const oneStavka = await Stavka.findOne(
            {
                where:
                {
                    id: id
                }
            });
        if(oneStavka) 
            return oneStavka; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getAll()
    {
        let allStavke = await Stavka.findAll();

        if(allStavke)
            return allStavke;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(stavka)
    {
        if(!stavka.naziv || !stavka.opis || !stavka.preduzece_id || !stavka.kategorija_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za novu stavku nisu ispravni!"});
        const newStavka = await Stavka.create(
            {
                naziv: stavka.naziv,
                opis: stavka.opis,
                preduzece_id: stavka.preduzece_id,
                kategorija_id: stavka.kategorija_id
            });
        
        
        if(newStavka)
            return newStavka;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom kreiranja nove stavke!"});
    }

    async update(stavka)
    {
        if(!stavka.naziv || !stavka.opis || !stavka.kategorija_id || !stavka.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za stavku nisu ispravni!"});
        const [rows, update] = await Stavka.update(
            {
                naziv: stavka.naziv,
                opis: stavka.opis,
                kategorija_id: stavka.kategorija_id
            },
            {
                where:
                {
                    id: stavka.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom azuriranja stavke!"});
    }

    async delete(id)
    {
        const deleteStavka = await Stavka.destroy(
            {
                where:
                {
                    id: id
                }
            });
        if(deleteStavka === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja stavke!"});
    }

    static getInstance()
    {
        return StavkaService.instance || (StavkaService.instance = new StavkaService());
    }
}

module.exports = StavkaService.getInstance();