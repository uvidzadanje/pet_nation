const {Kategorija} = require('../model/models');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class KategorijaService
{
    async get(id)
    {
        const oneKategorija = await Kategorija.findOne(
            {
                where:
                {
                    id: id
                },
                include: [
                    {
                        model: Kategorija,
                        as: "nadkategorija"
                    }
                ]
            });
        if(oneKategorija) 
            return oneKategorija; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getRootCategories()
    {
        const kategorije = await Kategorija.findAll(
            {
                where: {
                    nadkategorija_id: null
                }
            })
        
        if(!kategorije) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return kategorije;
    }

    async getAll()
    {
        let allKategorije = await Kategorija.findAll();
        if(allKategorije)
            return allKategorije;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(kategorija)
    {
        if(!kategorija.naziv) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST ,message: 'Nije unet naziv!'});
        const newKategorija = await Kategorija.create(
            {
                naziv: kategorija.naziv,
                nadkategorija_id: kategorija.nadkategorija_id
            });
        if(newKategorija)
            return newKategorija;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom kreiranja kategorije!'});
    }

    async update(kategorija)
    {
        if(!kategorija.naziv || !kategorija.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: 'Kategorija nema naziv!'});
        const [rows, update] = await Kategorija.update(
            {
                naziv: kategorija.naziv
            },
            {
                where:
                {
                    id: kategorija.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom promene kategorije!'});
    }

    async delete(options)
    {
        const deleteKategorija = await Kategorija.destroy(
            {
                where:
                {
                    ...options
                }
            });
        // if(deleteKategorija) 
        //     return true;
        // else
        //     throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom brisanja kategorije!'});
    }

    async getAllByKategorijaID(kategorijaID)
    {
        const kategorije = await Kategorija.findAll(
            {
            where: {
                nadkategorija_id: kategorijaID
            },
            include: [
                {
                    model: Kategorija
                }
            ]
        })
        
        if(!kategorije) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return kategorije;
    }

    static getInstance()
    {
        return KategorijaService.instance || (KategorijaService.instance = new KategorijaService());
    }
}

module.exports = KategorijaService.getInstance();