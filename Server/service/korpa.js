const {Korpa, Kupovina, Stavka, Proizvod, Kategorija, Potrosac, User, StavkaSlika} = require('../model/models');
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class KorpaService
{
    async get(id)
    {
        const oneKorpa = await Korpa.findOne(
            {
                where:
                {
                    id: id
                }
            });
        if(oneKorpa) 
            return oneKorpa; 
        else
            throw new ApplicationError(...httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getAll()
    {
        let allKorpe = await Korpa.findAll(
            {
                include: [
                    {
                        model: Kupovina,
                        required: true,
                        attributes: {
                            exclude: ["updatedAt", "korpa_id", "proizvod_id", "createdAt"]
                        },
                        include: [
                            {
                                model: Proizvod,
                                required: true,
                                attributes: {
                                    exclude: ["updatedAt", "stavka_id", "createdAt"]
                                },
                                include: [
                                    {
                                        model: Stavka,
                                        required: true,
                                        attributes: {
                                            exclude: ["updatedAt", "createdAt", "kategorija_id"]
                                        },
                                        include: [
                                            {
                                                model: Kategorija,
                                                required: true,
                                                attributes: {
                                                    exclude: ["updatedAt", "createdAt", "nadkategorija_id"]
                                                },
                                                include: [
                                                    {
                                                        model: Kategorija,
                                                        as: "nadkategorija"
                                                    }
                                                ]
                                            },
                                            {
                                                model: StavkaSlika,
                                                attributes: ["slika_link"]
    
                                            },
                                        ]
                                    }
                                ]

                            },
                            
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
                attributes: {
                    exclude: ["updatedAt", "potrosac_id"]
                },   
            }
        );
        if(allKorpe)
            return allKorpe;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(korpa)
    {
        if(!korpa.adresa_isporuke || !korpa.potrosac_id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: 'Neispravni podaci!'});
        const newKorpa = await Korpa.create(
            {
                adresa_isporuke: korpa.adresa_isporuke,
                potrosac_id: korpa.potrosac_id
            });
        if(newKorpa)
            return newKorpa;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom kreiranja korpe!'});
    }

    async update(korpa)
    {
        if(!korpa.adresa_isporuke || korpa.poslato_kuriru === undefined || korpa.poslato_kuriru === null || !korpa.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: 'Neispravni podaci!'});
        const [rows, update] = await Korpa.update(
            {
                adresa_isporuke: korpa.adresa_isporuke,
                poslato_kuriru: korpa.poslato_kuriru
            },
            {
                where:
                {
                    id: korpa.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom promene korpe!'});
    }

    async delete(id)
    {
        const deleteKorpa = await Korpa.destroy(
            {
                where:
                {
                    id: id
                }
            });
        if(deleteKorpa === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: 'Desila se greska prilikom brisanja korpe!'});
    
    }

    async getByPreduzece(preduzeceID)
    {
        const korpe = await Korpa.findAll(
            {
                include: [
                    {
                        model: Kupovina,
                        required: true,
                        attributes: {
                            exclude: ["updatedAt", "korpa_id", "proizvod_id", "createdAt"]
                        },
                        include: [
                            {
                                model: Proizvod,
                                required: true,
                                attributes: {
                                    exclude: ["updatedAt", "stavka_id", "createdAt"]
                                },
                                include: [
                                    {
                                        model: Stavka,
                                        required: true,
                                        attributes: {
                                            exclude: ["updatedAt", "createdAt", "kategorija_id"]
                                        },
                                        include: [
                                            {
                                                model: Kategorija,
                                                required: true,
                                                attributes: {
                                                    exclude: ["updatedAt", "createdAt", "nadkategorija_id"]
                                                },
                                                include: [
                                                    {
                                                        model: Kategorija,
                                                        as: "nadkategorija"
                                                    }
                                                ]
                                            },
                                            {
                                                model: StavkaSlika,
                                                attributes: ["slika_link"]
    
                                            }
                                        ]
                                    }
                                ]

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
                attributes: {
                    exclude: ["updatedAt", "potrosac_id"]
                },
                where: {
                    "$Kupovinas.Proizvod.Stavka.preduzece_id$": preduzeceID
                }
            })

        if(!korpe) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return korpe;
    }

    async getByPotrosac(potrosacID)
    {
        const korpe = await Korpa.findAll({
            include: [
                {
                    model: Kupovina,
                    required: true,
                    attributes: {
                        exclude: ["updatedAt", "korpa_id", "proizvod_id", "createdAt"]
                    },
                    include: [
                        {
                            model: Proizvod,
                            required: true,
                            attributes: {
                                exclude: ["updatedAt", "stavka_id", "createdAt"]
                            },
                            include: [
                                {
                                    model: Stavka,
                                    required: true,
                                    attributes: {
                                        exclude: ["updatedAt", "createdAt", "kategorija_id"]
                                    },
                                    include: [
                                        {
                                            model: Kategorija,
                                            required: true,
                                            attributes: {
                                                exclude: ["updatedAt", "createdAt", "nadkategorija_id"]
                                            },
                                            include: [
                                                {
                                                    model: Kategorija,
                                                    as: "nadkategorija"
                                                }
                                            ],
                                        },
                                        {
                                            model: StavkaSlika,
                                            attributes: ["slika_link"]

                                        }
                                    ]
                                }
                            ]

                        },
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
            attributes: {
                exclude: ["updatedAt", "potrosac_id"]
            },
            where: {
                potrosac_id: potrosacID
            }
        })

        if(!korpe) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return korpe;
    }

    static getInstance()
    {
        return KorpaService.instance || (KorpaService.instance = new KorpaService());
    }
}

module.exports = KorpaService.getInstance();