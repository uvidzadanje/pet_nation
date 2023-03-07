const db = require("../db");
const {
    User,
    Potrosac,
    Preduzece,
    Stavka,
    Proizvod,
    Usluga,
    Kategorija,
    Korpa,
    Kupovina,
    OcenaPreduzece,
    OcenaStavka,
    StavkaSlika,
    Zakazivanje
} = require("./models");

db.sync({force: true});
