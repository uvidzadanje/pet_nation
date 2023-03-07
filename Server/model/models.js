const User = require("./user");
const Potrosac = require("./potrosac");
const Preduzece = require("./preduzece");
const Stavka = require("./stavka");
const Proizvod = require("./proizvod");
const Usluga = require("./usluga");
const Kategorija = require("./kategorija");
const Korpa = require("./korpa");
const Kupovina = require("./kupovina");
const OcenaPreduzece = require("./ocena-preduzece");
const OcenaStavka = require("./ocena-stavka");
const StavkaSlika = require("./stavka-slika");
const Zakazivanje = require("./zakazivanje");

// User -> Potrosac
oneToManyRelation(User, Potrosac, "user_id");

// User -> Preduzece
oneToManyRelation(User, Preduzece, "user_id");

//Stavka -> Proizvod
oneToManyRelation(Stavka, Proizvod, "stavka_id");

//Stavka -> Usluga
oneToManyRelation(Stavka, Usluga, "stavka_id");

// Stavka -> Preduzece
oneToManyRelation(Preduzece, Stavka, "preduzece_id");

// Kategorija -> Stavka
oneToManyRelation(Kategorija, Stavka, "kategorija_id");

// Kategorija -> kategorija
oneToManyRelation(Kategorija, Kategorija, "nadkategorija_id", "nadkategorija");

// Korpa -> Kupovina
oneToManyRelation(Korpa, Kupovina, "korpa_id");

// Proizvod -> Kupovina
oneToManyRelation(Proizvod, Kupovina, "proizvod_id");

// Potrosac -> OcenaPreduzece
oneToManyRelation(Potrosac, OcenaPreduzece, "potrosac_id");

// Potrosac -> Korpa
oneToManyRelation(Potrosac, Korpa, "potrosac_id");

// Preduzece -> OcenaPreduzece
oneToManyRelation(Preduzece, OcenaPreduzece, "preduzece_id");

// Stavka -> OcenaStavka
oneToManyRelation(Stavka, OcenaStavka, "stavka_id");

// Potrosac -> OcenaStavka
oneToManyRelation(Potrosac, OcenaStavka, "potrosac_id");

// Stavka -> StavkaSlika
oneToManyRelation(Stavka, StavkaSlika, "stavka_id");

// Potrosac -> Zakazivanje
oneToManyRelation(Potrosac, Zakazivanje, "potrosac_id");

// Usluga -> Zakazivanje
oneToManyRelation(Usluga, Zakazivanje, "usluga_id");

function oneToManyRelation(strongType, weakType, foreignKey, as)
{
    strongType.hasMany(weakType, {
        foreignKey
    });
    weakType.belongsTo(strongType, {
        foreignKey,
        as
    });
}

module.exports = {
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
}