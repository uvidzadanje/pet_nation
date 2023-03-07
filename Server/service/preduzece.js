const {Preduzece, User, OcenaPreduzece} = require('../model/models');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const sequelize = require("sequelize");

class PreduzeceService
{
    async get(id)
    {
        const onePreduzece = await Preduzece.findOne(
            {
                where:
                {
                    id: id
                },
                attributes: {
                    include: [
                        [sequelize.fn('AVG', sequelize.col('OcenaPreduzeces.ocena')), 'avg_ocena'],
                    ],
                },
                include: [
                    {
                        model: User,
                        attributes: ["username", "email", "createdAt"]
                    },
                    {
                        model: OcenaPreduzece,
                        attributes: [],
                    }
                ]
            });
        if(onePreduzece && onePreduzece.id) 
            return onePreduzece; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getByUserID(userID)
    {
        const onePreduzece = await Preduzece.findOne(
            {
                where:
                {
                    user_id: userID
                }
            });
        if(onePreduzece) 
            return onePreduzece;
        else throw new ApplicationError({...httpErrorTypes.RESOURCE_NOT_FOUND, message: "Dati korisnik nije preduzece"});
    }

    async getAll()
    {
        let allPreduzeca = await Preduzece.findAll(
            {
                attributes: {
                    include: [
                        [sequelize.fn('AVG', sequelize.col('OcenaPreduzeces.ocena')), 'avg_ocena'],
                    ],
                },
                include: [
                    {
                        model: User,
                        attributes: ["username", "email", "createdAt"]
                    },
                    {
                        model: OcenaPreduzece,
                        attributes: [],
                    }
                ],
                group: ["Preduzece.id"],
            }
        );
        if(allPreduzeca)
            return allPreduzeca;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(preduzece)
    {
        if(!preduzece.naziv || !preduzece.lokacija || !preduzece.opis || 
            !preduzece.profilna_slika_link || !preduzece.user_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za novo preduzece nisu ispravni!"});
        const newPreduzece = await Preduzece.create(
            {
                naziv: preduzece.naziv,
                lokacija: preduzece.lokacija,
                opis: preduzece.opis,
                profilna_slika_link: preduzece.profilna_slika_link,
                user_id: preduzece.user_id
            });
        if(newPreduzece)
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom kreiranja novog preduzeca!"});
    }

    async update(preduzece)
    {
        if(!preduzece.naziv || !preduzece.lokacija || !preduzece.opis || !preduzece.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za preduzece nisu ispravni!"});
        const [rows, update] = await Preduzece.update(
            {
                naziv: preduzece.naziv,
                lokacija: preduzece.lokacija,
                opis: preduzece.opis
            },
            {
                where:
                {
                    id: preduzece.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom azuriranja preduzeca!"});
    }

    async updateImage(preduzece)
    {
        if(!preduzece.id || !preduzece.profilna_slika_link)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za preduzece nisu ispravni!"});

        const [rows, update] = await Preduzece.update(
            {
                profilna_slika_link: preduzece.profilna_slika_link
            },
            {
                where:
                {
                    id: preduzece.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom azuriranja preduzeca!"});
    }

    async delete(option)
    {
        const deletePreduzece = await Preduzece.destroy(
            {
                where:
                {
                    ...option
                }
            });

        console.log(deletePreduzece);
        if(deletePreduzece === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja preduzeca!"});
    }

    static getInstance()
    {
        return PreduzeceService.instance || (PreduzeceService.instance = new PreduzeceService());
    }
}

module.exports = PreduzeceService.getInstance();