const UserService = require("../service/user");
const {ApplicationError, httpErrorTypes} = require("../utils/error/");
const {sendResponse, setTokenInCookie} = require("../helpers/response");
const JoiValidation = require("../utils/validation");
const {compareValues, compareIsPreduzece, compareIsAdmin} = require("../helpers/crypt"); 
const {signToken, encodeToken} = require("../helpers/jwt");
const PreduzeceService = require("../service/preduzece");
const PotrosacService = require("../service/potrosac");

const HOURS_IN_MILISECONDS = 60*60*1000;
const DAY_IN_SECONDS = 86400;

const types = {
    potrosac: PotrosacService,
    preduzece: PreduzeceService,
}

const validateTypes = {
    potrosac: JoiValidation.potrosacRegisterSchema,
    preduzece: JoiValidation.preduzeceRegisterSchema
}

class UserController {

    static getInstance()
    {
        return UserController.instance || (UserController.instance = new UserController());
    }

    async getAll(req, res, next)
    {
        try {
            const allUsers = await UserService.getAll(); 

            return sendResponse(res, allUsers);
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next)
    {
        try {
            const {username, id, createdAt} = await UserService.get({id:req.params.id});

            return sendResponse(res, {id, username, createdAt});
        } catch (error) {
            next(error);
        }
    }

    async getBySession(req, res, next)
    {
        try {
            const {username, id, createdAt}= await UserService.get({ id: req.user.id });

            return sendResponse(res, {id, username, createdAt});
        } catch (error) {
            next(error);
        }   
    }

    async getAuth(req, res, next)
    {
        try {
            let token = req.cookies.token;
    
            if(!token) return sendResponse(res, {isAuthentificated: false});

            const verify = encodeToken(token);

            if(!verify) return sendResponse(res, {isAuthentificated: false});

            const {id, type} = verify;
            req.user = {id, type};

            return sendResponse(res, {isAuthentificated: true, type: await getType(req.user.type), id: req.user.id});
        } catch (error) {
            next(error);
        }
    }

    async register(req, res, next)
    {
        try {
            const userType = req.body.type.toLowerCase();

            if(!userType || !types[userType]) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Los tip korisnika"});
            
            const user = await UserService.create({...req.body, type: userType}); 

            const imageFilePath = req.file ? "/" + req.file.path : "/uploads/default_profile_image.png";

            await types[userType].create({...req.body, user_id: user.id, type: userType, profilna_slika_link: imageFilePath});

            return sendResponse(res, {message: `Uspesno registrovan korisnik`});
        } catch (error) {
            next(error);
        }
    }

    async registerAdmin(req, res, next)
    {
        try {
            const user = await UserService.create({...req.body, type: "admin"});

            return sendResponse(res, {message: `Uspesno registrovan korisnik`});
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next)
    {
        try {
            const {username, password} = req.body;
            const user = await UserService.get({username: username});

            const isComparePasswords = await compareValues(password, user.password);
    
            if (!isComparePasswords) throw new ApplicationError({...httpErrorTypes.UNAUTHORIZED, message: "Lozinke se ne podaraju!"});
            
            const token = signToken({ id:user.id, type:user.type }, DAY_IN_SECONDS);

            setTokenInCookie(res, token, DAY_IN_SECONDS*1000);

            return sendResponse(res, {message: "Uspesno prijavljen korisnik", type: await getType(user.type)});
            
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next)
    {
        try {
            const data = {...req.body};

            if(!(await compareIsAdmin(req.user.type))) delete data.email;

            await UserService.update({...data, id:req.params.id});

            return sendResponse(res, {message: "Uspesno izmenjen korisnik!"});
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next)
    {
        try {
            const user = await UserService.get({id: req.params.id});
            await deleteType(user);

            await UserService.delete(req.params.id);

            return sendResponse(res, {message: "Uspesno obrisan korisnik"});
        } catch (error) {
            next(error);
        }
    }

    async deleteBySession(req, res, next)
    {
        try {

            await deleteType(req.user);

            await UserService.delete(req.user.id);


            setTokenInCookie(res, 0, 0);

            return sendResponse(res, {message: "Uspesno obrisan korisnik"});
        } catch (error) {
            next(error);
        }
    }

    async updateBySession(req, res, next)
    {
        try {
            const data = {...req.body};

            if(!(await compareIsAdmin(req.user.type))) delete data.email;

            if(data.old_password && data.password)
            {
                const {password} = await UserService.get({id: req.user.id});

                if(!await compareValues(data.old_password, password)) 
                    throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "Stara lozinka neispravna!"});
            }
            else
            {
                delete data.old_password;
                delete data.password;
            }

            await UserService.update({...data, id: req.user.id});
            
            return sendResponse(res, {message: "Uspesno izmenjeni podaci!"});
        } catch (error) {
            next(error);
        }
    }

    async validateRegister(req, res, next)
    {
        try {
            const userType = req.body.type.toLowerCase();

            const {error} = await JoiValidation.registerSchema(req.body);

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error.message});

            const {error: userError} = await validateTypes[userType](req.body);

            if(userError) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: userError.message});

            return next();
        } catch (error) {
            next(error);
        }
    }

    async validateUpdate(req, res, next)
    {
        try {
            const id = req.params.id || req.user.id;
            const {error} = await JoiValidation.userUpdateSchema({...req.body, id: id});

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error.message});

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateLogin(req, res, next)
    {
        try {
            const {error} = JoiValidation.loginSchema(req.body);

            if(error) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: error});

            return next();
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next)
    {
        try {
            setTokenInCookie(res, 0, 0);
    
            return sendResponse(res, {message: "Uspesno ste se odjavili"});
        } catch (error) {
            next(error)
        }
    }

}

async function deleteType(user)
{
    if(await compareIsAdmin(user.type)) return;
    
    if(await compareIsPreduzece(user.type)) await types["preduzece"].delete({user_id: user.id});
    else types["potrosac"].delete({user_id: user.id});
}

async function getType(hashType)
{
    if(await compareIsAdmin(hashType)) return "admin";
    if(await compareIsPreduzece(hashType)) return "preduzece";
    return "potrosac";
}

module.exports = UserController.getInstance();