const {Zakazivanje, Potrosac, Usluga, Stavka, User} = require('../model/models');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class ZakazivanjeService
{
    async get(id)
    {
        const oneZakazivanje = await Zakazivanje.findOne(
            {
                where:
                {
                    id: id
                },
                include: [
                    {
                        model: Potrosac,
                        required: true,
                        attributes: ["ime", "prezime", "broj_telefona"],
                        include: [
                            {
                                model: User,
                                attributes: ["email"]
                            }
                        ]
                    },
                    {
                        model: Usluga,
                        required: true,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "stavka_id"]
                        },
                        include: [{
                            model: Stavka,
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "preduzece_id"]
                            },
                            required: true
                        }]
                    }
                ]
            });
        if(oneZakazivanje) 
            return oneZakazivanje; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getAll()
    {
        let allZakazivanja = await Zakazivanje.findAll({
            include: [
                {
                    model: Usluga,
                    required: true,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                    include: [
                        {
                            model: Stavka,
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            },
                            required: true
                        }
                    ]
                },
                {
                    model: Potrosac,
                    required: true,
                    attributes: ["ime", "prezime", "broj_telefona"],
                    include: [
                        {
                            model: User,
                            attributes: ["email"]
                        }
                    ]
                }
            ],
        });
        if(allZakazivanja)
            return allZakazivanja;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(zakazivanje)
    {
        if(!zakazivanje.datum_zakazivanja || !zakazivanje.broj_sati || !zakazivanje.potrosac_id || 
            !zakazivanje.usluga_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za novo zakazivanje nisu ispravni!"});
        const newZakazivanje = await Zakazivanje.create(
            {
                datum_zakazivanja: zakazivanje.datum_zakazivanja,
                broj_sati: zakazivanje.broj_sati,
                potrosac_id: zakazivanje.potrosac_id,
                usluga_id: zakazivanje.usluga_id
            });
        if(newZakazivanje)
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom kreiranja novog zakazivanja!"});
    }

    async update(zakazivanje)
    {
        if(!zakazivanje.datum_zakazivanja || !zakazivanje.broj_sati || !zakazivanje.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za zakazivanje nisu ispravni!"});
        const [rows, update] = await Zakazivanje.update(
            {
                datum_zakazivanja: zakazivanje.datum_zakazivanja,
                broj_sati: zakazivanje.broj_sati
            },
            {
                where:
                {
                    id: zakazivanje.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom azuriranja zakazivanja!"});
    }

    async delete(id)
    {
        const deleteZakazivanje = await Zakazivanje.destroy(
            {
                where:
                {
                    id: id
                }
            });
        if(deleteZakazivanje === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja zakazivanja!"});
    }

    async getByPreduzece(preduzeceID)
    {
        const zakazivanja = await Zakazivanje.findAll({
            include: [
                {
                    model: Usluga,
                    required: true,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                    include: [
                        {
                            model: Stavka,
                            required: true,
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            },
                        }
                    ]
                },
                {
                    model: Potrosac,
                    required: true,
                    attributes: ["ime", "prezime", "broj_telefona"],
                    include: [
                        {
                            model: User,
                            attributes: ["email"]
                        }
                    ]
                }
            ],
            where: {
                "$Usluga.Stavka.preduzece_id$": preduzeceID 
            }
        })

        if(!zakazivanja) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return zakazivanja;
    }

    async getByPotrosac(potrosacID)
    {
        const zakazivanja = await Zakazivanje.findAll({
            include: [
                {
                    model: Usluga,
                    required: true,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                    include: [
                        {
                            model: Stavka,
                            required: true,
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            },
                        }
                    ],
                },
                {
                    model: Potrosac,
                    required: true,
                    attributes: ["ime", "prezime", "broj_telefona"],
                    include: [
                        {
                            model: User,
                            attributes: ["email"]
                        }
                    ]
                }

            ],
            where: {
                potrosac_id: potrosacID
            }
        });

        if(!zakazivanja) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return zakazivanja;
    }

    static getInstance()
    {
        return ZakazivanjeService.instance || (ZakazivanjeService.instance = new ZakazivanjeService());
    }
}

module.exports = ZakazivanjeService.getInstance();