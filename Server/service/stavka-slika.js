const {StavkaSlika, Stavka} = require('../model/models');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class StavkaSlikaService
{
    async get(id)
    {
        const oneStavkaSlika = await StavkaSlika.findOne(
            {
                where:
                {
                    id: id
                }
                // include ako treba jos nesto da se vrati
            });
        if(oneStavkaSlika) 
            return oneStavkaSlika; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getByStavka(stavkaID)
    {
        const slike = await StavkaSlika.findAll(
            {
                where: {
                    stavka_id: stavkaID,
                }
            })

        if(!slike) throw ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return slike;
    }

    async getAll()
    {
        let allStavkaSlika = await StavkaSlika.findAll();
        if(allStavkaSlika)
            return allStavkaSlika;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(stavkaSlika)
    {
        if(!stavkaSlika.slika_link || !stavkaSlika.stavka_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za novu sliku stavke nisu ispravni!"});
        const newStavkaSlika = await StavkaSlika.create(
            {
                slika_link: stavkaSlika.slika_link,
                stavka_id: stavkaSlika.stavka_id
            });
        if(newStavkaSlika)
            return newStavkaSlika;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom kreiranja nove slike stavke!"});
    }

    async update(stavkaSlika)
    {
        if(!stavkaSlika.slika_link || !stavkaSlika.stavka_id || !stavkaSlika.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za sliku stavke nisu ispravni!"});
        const [rows, update] = await StavkaSlika.update(
            {
                slika_link: stavkaSlika.slika_link,
                stavka_id: stavkaSlika.stavka_id
            },
            {
                where:
                {
                    id: stavkaSlika.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom azuriranja slike stavke!"});
    }

    async delete(id)
    {
        const deleteStavkaSlika = await StavkaSlika.destroy(
            {
                where:
                {
                    id: id
                }
            });
        if(deleteStavkaSlika === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja slike stavke!"});
    }

    static getInstance()
    {
        return StavkaSlikaService.instance || (StavkaSlikaService.instance = new StavkaSlikaService());
    }
}

module.exports = StavkaSlikaService.getInstance();