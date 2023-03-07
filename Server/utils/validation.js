const joi = require('@hapi/joi');

class JoiValidation {

    static getInstance()
    {
        return JoiValidation.instance || (JoiValidation.instance = new JoiValidation());
    }

    async registerSchema (data) {
        const schema = joi.object({
            email: joi.string().min(6).max(50).email({ tlds: { allow: false }}).required(),
            password: joi.string().min(6).max(25).required(),
            repeat_password: joi.ref("password"),
            username: joi.string().min(5).max(25).required(),
        });
        return schema.validate({
            email: data.email, 
            password: data.password, 
            repeat_password: data.repeat_password, 
            username: data.username
        });
    }

    async potrosacRegisterSchema(data)
    {
        const schema = joi.object({
            ime: joi.string().max(30).required(),
            prezime: joi.string().max(30).required(),
            broj_telefona: joi.string().max(30).required(),
        })
        return schema.validate({
            ime: data.ime,
            prezime: data.prezime,
            broj_telefona: data.broj_telefona
        })
    }
    

    async preduzeceRegisterSchema(data)
    {
        const schema = joi.object({
            naziv: joi.string().max(50).required(),
            lokacija: joi.string().max(50).required(),
            opis: joi.string().max(250).required()
        })

        return schema.validate({
            naziv: data.naziv,
            lokacija: data.lokacija,
            opis: data.opis,
        })
    }

    async userUpdateSchema (data) {
        const schema = joi.object({
            email: joi.string().min(6).max(50).email({ tlds: { allow: false }}),
            old_password: joi.string().min(6).max(25).allow(''),
            password: joi.string().min(6).max(25).allow(''),
            repeat_password: joi.ref("password"),
            username: joi.string().min(5).max(25).required(),
            id: joi.number().integer().required(),
        });
        return schema.validate(data);
    }

    async potrosacUpdateSchema(data)
    {
        const schema = joi.object({
            ime: joi.string().max(30).required(),
            prezime: joi.string().max(30).required(),
            broj_telefona: joi.string().max(30).required(),
            id: joi.number().integer().required(),
        })
        return schema.validate(data);
    }
    

    async preduzeceUpdateSchema(data)
    {
        const schema = joi.object({
            naziv: joi.string().max(50).required(),
            lokacija: joi.string().max(50).required(),
            opis: joi.string().max(250).required(),
            id: joi.number().integer().required()
        })

        return schema.validate(data);
    }

    async loginSchema(data) {
        const schema = joi.object({
            username: joi.string().min(5).max(25).required(),
            password: joi.string().min(6).max(25).required(),
        });
        return schema.validate(data);
    }

    async addProizvodSchema(data)
    {
        const schema = joi.object({
            cena: joi.number().required(),
            naziv_proizvodjaca: joi.string().required(),
            zemlja_porekla: joi.string().required(),
        })
        return schema.validate({
            cena: data.cena,
            naziv_proizvodjaca: data.naziv_proizvodjaca,
            zemlja_porekla: data.zemlja_porekla
        });
    }

    async updateProizvodSchema(data)
    {
        const schema = joi.object({
            cena: joi.number().required(),
            naziv_proizvodjaca: joi.string().required(),
            zemlja_porekla: joi.string().required(),
            id: joi.number().integer().required()
        })
        return schema.validate(data);
    }

    async addUslugaSchema(data)
    {
        const schema = joi.object({
            cena_po_satu: joi.number().required(),
        })
        return schema.validate({
            cena_po_satu: data.cena_po_satu,
        });
    }

    async updateUslugaSchema(data)
    {
        const schema = joi.object({
            cena_po_satu: joi.number().required(),
            id: joi.number().integer().required()
        })
        return schema.validate(data);
    }

    async addKorpaSchema(data)
    {
        const schema = joi.object({
            adresa_isporuke: joi.string().required(),
            potrosac_id: joi.number().integer().required()
        })
        return schema.validate(data)
    }

    async updateKorpaSchema(data)
    {
        const schema = joi.object({
            adresa_isporuke: joi.string().required(),
            poslato_kuriru: joi.bool().required(),
            id: joi.number().integer().required()
        })
        return schema.validate(data);
    }

    async addZakazivanjeSchema(data)
    {
        const schema = joi.object({
            datum_zakazivanja: joi.date().min(Date.now()).required(),
            broj_sati: joi.number().integer().required(),
            potrosac_id: joi.number().integer().required(),
            usluga_id: joi.number().integer().required()
        })
        return schema.validate(data);
    }

    async updateZakazivanjeSchema(data)
    {
        const schema = joi.object({
            datum_zakazivanja: joi.date().min(Date.now()).required(),
            broj_sati: joi.number().integer().required(),
            id: joi.number().integer().required()
        })
        return schema.validate(data);
    }

    async addStavkaSchema(data)
    {
        const schema = joi.object({
            naziv: joi.string().required(),
            opis: joi.string().max(300),
            preduzece_id: joi.number().integer().required(),
            kategorija_id: joi.number().integer().required()
        })
        return schema.validate({
            naziv: data.naziv,
            opis: data.opis,
            preduzece_id: data.preduzece_id,
            kategorija_id: data.kategorija_id
        })
    }

    async updateStavkaSchema(data)
    {
        const schema = joi.object({
            naziv: joi.string().required(),
            opis: joi.string().max(300),
            kategorija_id: joi.number().integer().required(),
            id: joi.number().integer().required()
        })
        return schema.validate(data);
    }
}

module.exports = JoiValidation.getInstance();