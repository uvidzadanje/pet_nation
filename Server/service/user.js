const {User} = require("../model/models");
const {Op} = require("sequelize");
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const {hashValue} = require("../helpers/crypt");

class UserController {

    static getInstance()
    {
        return UserController.instance || (UserController.instance = new UserController());
    }

    async getAll()
    {
        const allUsers = await User.findAll(
            {
                attributes: {
                    exclude: ["password", "type"]
                }
            }
            );

        if(!allUsers) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return allUsers;
    }

    async get(options)
    {
        const user = await User.findOne({
            where: {
                ...options
            }
        });

        if(!user) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

        return user;
    }

    async create(user)
    {
        if(
            await User.findOne(
                {
                    where: {
                        [Op.or]: [
                            { email: user.email },
                            { username: user.username }
                        ]
                    }
                })
        ) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Korisnik postoji u bazi podataka"});
            
        const hashPassword = await hashValue(user.password);

        const hashType = await hashValue(user.type);

        const created = await User.create({
            email: user.email,
            username: user.username,
            password: hashPassword,
            type: hashType,
        });

        return created;
    }

    async update(user)
    {
        const {id, username, password, email} = user;

        if(!id || !username) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Neka od obaveznih polja su prazna."});

        const parameters = [{username}];
        if(email) parameters.push({email});

        const users = await User.findAll({
            where: {
                [Op.or]: parameters
            }
        });

        if(users.length > 1) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Username ili email nisu unique vrednosti"});

        if(users.length === 1 && users[0].id != id) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Username ili email nisu unique vrednosti"});

        const values = {username};

        if(password)
        { 
            const hashPassword = await hashValue(password);
            values.password = hashPassword;
        }

        if(email)
        {
            values.email = email;
        }

        const rows = await User.update(values, {
            where: {
                id: id
            }
        });

        if(rows === 0) throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do problema sa azuriranjem"});

        return true;
    }

    async delete(id)
    {
        const deletedUser = await User.destroy({
            where: {
                id: id
            }
        });

        if (deletedUser === 0) throw new ApplicationError({...httpErrorTypes.INTERNAL_SERVER_ERROR, message: "Doslo je do problema kod brisanja"});

        return true;
    }
}

module.exports = UserController.getInstance();