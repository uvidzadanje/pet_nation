const {Proizvod, Stavka, OcenaStavka, StavkaSlika, Kategorija, Preduzece} = require('../model/models');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const sequelize = require("sequelize");

class ProizvodService
{
    async get(id)
    {
        const oneProizvod = await Proizvod.findOne(
            {
                where:
                {
                    id: id
                },
                attributes: {
                    include: [
                        [sequelize.fn('AVG', sequelize.col('Stavka.OcenaStavkas.ocena')), 'avg_ocena']
                    ]
                },
                include: [{
                        model: Stavka,
                        attributes: [
                            "id",
                            "naziv",
                            "opis",
                            "preduzece_id"
                        ],
                        required: true,
                        include:[ 
                            {
                                model: OcenaStavka,
                                attributes: []
                            },
                            {
                                model: StavkaSlika
                            },
                            {
                                model: Preduzece,
                                required: true,
                            },
                            {
                                model: Kategorija,
                                required: true,
                                include: [
                                    {
                                        model: Kategorija,
                                        as: "nadkategorija"
                                    }
                                ]
                            },
                        ]
                }]
            });
        if(oneProizvod && oneProizvod.id) 
            return oneProizvod; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getAll()
    {
        let allProizvodi = await Proizvod.findAll();
        if(allProizvodi)
            return allProizvodi;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(proizvod)
    {
        if(!proizvod.cena || !proizvod.naziv_proizvodjaca || !proizvod.zemlja_porekla || 
            !proizvod.stavka_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za novi proizvod nisu ispravni!"});
        const newProizvod = await Proizvod.create(
            {
                cena: proizvod.cena,
                naziv_proizvodjaca: proizvod.naziv_proizvodjaca,
                zemlja_porekla: proizvod.zemlja_porekla,
                stavka_id: proizvod.stavka_id
            });
        if(newProizvod)
            return newProizvod.id;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom kreiranja novog proizvoda!"});
    }

    async update(proizvod)
    {
        if(!proizvod.cena || !proizvod.naziv_proizvodjaca || !proizvod.zemlja_porekla || !proizvod.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za proizvod nisu ispravni!"});
        const [rows, update] = await Proizvod.update(
            {
                cena: proizvod.cena,
                naziv_proizvodjaca: proizvod.naziv_proizvodjaca,
                zemlja_porekla: proizvod.zemlja_porekla
            },
            {
                where:
                {
                    id: proizvod.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom azuriranja proizvoda!"});
    }

    async delete(id)
    {
        const deleteProizvod = await Proizvod.destroy(
            {
                where:
                {
                    id: id
                }
            });
        if(deleteProizvod === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja proizvoda!"});
    }

    async deleteByStavkaID(stavka_id)
    {
        const deleteProizvod = await Proizvod.destroy(
            {
                where:
                {
                    stavka_id: stavka_id
                }
            });
        if(deleteProizvod === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja proizvoda!"});
    }

    async getAllByFilters(filters)
    {   
        const whereCond = { };

        if(filters.min_price && filters.max_price) whereCond["cena_rang"] = {cena: { [sequelize.Op.between]: [filters.min_price, filters.max_price] }};
        if(filters.avg_ocena && filters.avg_ocena !== "0") whereCond["ocena"] = {avg_ocena:{[sequelize.Op.gte]: filters.avg_ocena}};
        if(filters.kategorija_id && filters.kategorija_id !== "0") whereCond["kategorija"] = {kategorija_id: filters.kategorija_id}

        const proizvodi = await Proizvod.findAll({
            where: {...whereCond.cena_rang},
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Stavka.OcenaStavkas.ocena')), 'avg_ocena'],
                ],
            },
            include: [
                {
                    model: Stavka,
                    attributes: [
                        "id",
                        "naziv",
                        "opis",
                        "kategorija_id",
                    ],
                    required: true,
                    where:{...whereCond.kategorija},
                    include:[
                        {
                            model: OcenaStavka,
                            attributes: [],
                            required: false,
                        },
                        {
                            model: Kategorija,
                            include: [
                                {
                                    model: Kategorija,
                                    as: "nadkategorija"
                                }
                            ]
                        },
                        {
                            model: StavkaSlika
                        },
                        {
                            model: Preduzece,
                            required: true,
                        }
                    ]
                },
            ],
            
            group: ["Proizvod.id"],
            having: {...whereCond.ocena}
        });

        if(!proizvodi) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return proizvodi.filter(proizvod => proizvod.id !== null);
    }

    async getByPreduzece(preduzeceID)
    {
        const proizvodi = await Proizvod.findAll(
            {
                include: [
                    {
                        model: Stavka,
                        required: true,
                        include:[
                            {
                                model: OcenaStavka,
                                attributes: [],
                                required: false,
                            },
                            {
                                model: Kategorija,
                                required: true,
                                include: [
                                    {
                                        model: Kategorija,
                                        as: "nadkategorija"
                                    }
                                ]
                            },
                            {
                                model: StavkaSlika
                            },
                            {
                                model: Preduzece,
                                required: true,
                            }
                        ]
                    }
                ],
                where: {
                    "$Stavka.preduzece_id$": preduzeceID
                }
            })

        if(!proizvodi) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return proizvodi;
    }

    static getInstance()
    {
        return ProizvodService.instance || (ProizvodService.instance = new ProizvodService());
    }
}

module.exports = ProizvodService.getInstance();