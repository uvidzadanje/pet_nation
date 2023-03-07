const {Kupovina, Korpa, Proizvod, Potrosac} = require('../model/models');
const { ApplicationError, httpErrorTypes } = require('../utils/error');

class KupovinaService
{
    async get(id)
    {
        const oneKupovina = await Kupovina.findOne(
            {
                where:
                {
                    id: id
                },
                include:
                [
                    {
                        model: Korpa,
                        attributes: ["id", "adresa_isporuke", "poslato_kuriru"],
                    },
                    {
                        model: Proizvod,
                        attributes: ["id", "cena", "naziv_proizvodjaca", "zemlja_porekla"],
                    }
                ],
            });
        if(oneKupovina) 
            return oneKupovina; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getByKorpaID(korpaID)
    {
        let kupovine = await Kupovina.findAll({
            where: {
                korpa_id: korpaID
            },
            include: [
                {
                    model: Proizvod,
                    include: [
                        {
                            model: Stavka,
                            include: [
                                {
                                    model: Preduzece,
                                    attributes: ["naziv"]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if(kupovine) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return kupovine;
    }

    async getAll()
    {
        let allKupovine = await Kupovina.findAll();
        if(allKupovine)
            return allKupovine;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(kupovina)
    {
        if(!kupovina.korpa_id || !kupovina.proizvod_id || !kupovina.kolicina || isNaN(kupovina.kolicina) || kupovina.kolicina < 1) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: 'Neispravni podaci!'});
        const newKupovina = await Kupovina.create(
            {
                korpa_id: kupovina.korpa_id,
                proizvod_id: kupovina.proizvod_id,
                kolicina: kupovina.kolicina,
            });
        if(newKupovina)
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom kreiranja kupovine!'});
    }

    async update(kupovina)
    {
        if(!kupovina.id || !kupovina.kolicina || isNaN(kupovina.kolicina) || kupovina.kolicina < 1)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: 'Neispravni podaci!'});
        const [rows, update] = await Kupovina.update(
            {
                kolicina: kupovina.kolicina,
            },
            {
                where:
                {
                    id: kupovina.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom promene kupovine!'});
    }

    async delete(option)
    {
        if(!option.id && !option.korpa_id) throw new ApplicationError(httpErrorTypes.BAD_REQUEST);

        const deleteKupovina = await Kupovina.destroy(
            {
                where:
                {
                    ...option
                }
            });
        // if(deleteKupovina === 1) 
        return true;
        // else
        //     throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom brisanja kupovine!'});
    }

    static getInstance()
    {
        return KupovinaService.instance || (KupovinaService.instance =  new KupovinaService());
    }
}

module.exports = KupovinaService.getInstance();