const {Potrosac, User} = require('../model/models');
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

class PotrosacService
{
    async get(id)
    {
        const onePotrosac = await Potrosac.findOne(
            {
                where:
                {
                    id: id
                },
                include: [
                    {
                        model: User,
                        attributes: ["username", "email", "createdAt"]
                    }
                ]
                
            });
        if(onePotrosac) 
            return onePotrosac; 
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async getByUserID(userID)
    {
        const onePotrosac = await Potrosac.findOne(
            {
                where:
                {
                    user_id: userID
                }
            });
        if(onePotrosac) 
            return onePotrosac;
        else throw new ApplicationError({...httpErrorTypes.RESOURCE_NOT_FOUND, message: "Potrosac sa ovim parametrima ne postoji"});
    }

    async getAll()
    {
        let allPotrosaci = await Potrosac.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id","username", "email", "createdAt"]
                }
            ]
        });
        if(allPotrosaci)
            return allPotrosaci;
        else
            throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
    }

    async create(potrosac)
    {
        if(!potrosac.ime || !potrosac.prezime || !potrosac.broj_telefona || !potrosac.user_id) 
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za novog potrosaca nisu ispravni!"});
        const newPotrosac = await Potrosac.create(
            {
                ime: potrosac.ime,
                prezime: potrosac.prezime,
                broj_telefona: potrosac.broj_telefona,
                user_id: potrosac.user_id
            });
        if(newPotrosac)
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom kreiranja novog potrosaca!"});
    }

    async update(potrosac)
    {
        if(!potrosac.ime || !potrosac.prezime || !potrosac.broj_telefona || !potrosac.id)
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Uneti podaci za potrosaca nisu ispravni!"});
        const [rows, update] = await Potrosac.update(
            {
                ime: potrosac.ime,
                prezime: potrosac.prezime,
                broj_telefona: potrosac.broj_telefona
            },
            {
                where:
                {
                    id: potrosac.id
                }
            });
        if(rows === 1) 
            return true;
        else 
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom azuriranja potrosaca!"});
    }

    async delete(option)
    {
        const deletePotrosac = await Potrosac.destroy(
            {
                where:
                {
                    ...option
                }
            });
        if(deletePotrosac === 1) 
            return true;
        else
            throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do greske prilikom brisanja potrosaca!"});
    }

    static getInstance()
    {
        return PotrosacService.instance || (PotrosacService.instance = new PotrosacService());
    }
}

module.exports = PotrosacService.getInstance();