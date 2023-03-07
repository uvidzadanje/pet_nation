const {Usluga, Stavka, OcenaStavka, Kategorija, Preduzece, StavkaSlika} = require('../model/models');
const sequelize = require('sequelize');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class UslugaService
{
    async get(id)
    {
        const oneUsluga = await Usluga.findOne(
            {
                include: [
                    {
                        model: Stavka,
                        required: true,
                        include: [
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
                    }
                ],
                attributes: {
                    include: [
                        [sequelize.fn('AVG', sequelize.col('Stavka.OcenaStavkas.ocena')), 'avg_ocena']
                    ]
                },
                where:
                {
                    id: id
                }
            });
        if(oneUsluga && oneUsluga.id) 
            return oneUsluga; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getAll()
    {
        let allUsluge = await Usluga.findAll();
        if(allUsluge)
            return allUsluge;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(usluga)
    {
        if(!usluga.cena_po_satu || !usluga.stavka_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za novu uslugu nisu ispravni!"});
        const newUsluga = await Usluga.create(
            {
                cena_po_satu: usluga.cena_po_satu,
                stavka_id: usluga.stavka_id
            });
        if(newUsluga)
            return newUsluga.id;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom kreiranja nove usluge!"});
    }

    async update(usluga)
    {
        if(!usluga.cena_po_satu || !usluga.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za uslugu nisu ispravni!"});
        const [rows, update] = await Usluga.update(
            {
                cena_po_satu: usluga.cena_po_satu,
            },
            {
                where:
                {
                    id: usluga.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom azuriranja usluge!"});
    }

    async delete(id)
    {
        const deleteUsluga = await Usluga.destroy(
            {
                where:
                {
                    id: id
                }
            });
        if(deleteUsluga === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja usluge!"});
    }

    async deleteByStavkaID(stavka_id)
    {
        const deleteUsluga = await Usluga.destroy(
            {
                where:
                {
                    stavka_id: stavka_id
                }
            });
        if(deleteUsluga === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja usluge!"});
    }
    
    async getAllByFilters(filters)
    {
        const whereCond = { };

        if(filters.min_price && filters.max_price) whereCond["cena_rang"] = {cena_po_satu: { [sequelize.Op.between]: [filters.min_price, filters.max_price] }};
        if(filters.avg_ocena && filters.avg_ocena !== "0") whereCond["ocena"] = {avg_ocena:{[sequelize.Op.gte]: filters.avg_ocena}};
        if(filters.kategorija_id && filters.kategorija_id !== "0") whereCond["kategorija"] = {kategorija_id: filters.kategorija_id};
        if(filters.lokacija) whereCond["lokacija"] = {"$Stavka.Preduzece.lokacija$": filters.lokacija};
        
        const usluge = Usluga.findAll({
            where: {
                ...whereCond.cena_rang,
                ...whereCond.lokacija,
            },
            include: [
                {
                    model: Stavka,
                    required: true,
                    where:{...whereCond.kategorija},
                    include:[
                        {
                            model: OcenaStavka,
                            attributes: [],
                            required: false,
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
                        {
                            model: StavkaSlika
                        }
                    ]
                }
            ],
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Stavka.OcenaStavkas.ocena')), 'avg_ocena']
                ]
            },

            group: ["Usluga.id"],
            having: {...whereCond.ocena}
        });

        if(!usluge) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return usluge;
    }

    async getByPreduzece(preduzeceID)
    {
        const usluge = await Usluga.findAll(
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

        if(!usluge) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return usluge;
    }

    static getInstance()
    {
        return UslugaService.instance || (UslugaService.instance = new UslugaService());
    }
}

module.exports = UslugaService.getInstance();