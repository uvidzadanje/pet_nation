const ErrorController = require("../controller/error");
const {ApplicationError, httpErrorTypes} = require("../utils/error/");

module.exports = (app) => {
    app.use("/users", require("./user"));
    app.use("/kategorije", require("./kategorija"));
    app.use("/korpe", require("./korpa"));
    app.use("/kupovine", require("./kupovina"));
    app.use("/ocene-preduzece", require("./ocena-preduzece"));
    app.use("/ocene-stavka", require("./ocena-stavka"));
    app.use("/potrosaci", require("./potrosac"));
    app.use("/preduzeca", require("./preduzece"));
    app.use("/stavka-slike", require("./stavka-slika"));
    app.use("/stavke", require("./stavka"));
    app.use("/usluge", require("./usluga"));
    app.use("/proizvodi", require("./proizvod"));
    app.use("/zakazivanja", require("./zakazivanje"));
    app.use((req, res, next) => {
        next(new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND));
    });
    app.use(ErrorController.errorHandler);
}