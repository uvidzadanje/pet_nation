const express = require('express');
const OcenaStavkaController = require("../controller/ocena-stavka");
const AuthMiddleware = require("../middleware/auth");
const PotrosacMiddleware = require("../middleware/potrosac");
const OcenaStavkaMiddleware = require("../middleware/ocena-stavka");

const router = express.Router();

router.get("/ocena/stavka/:id", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, OcenaStavkaController.getByPotrosacSession);

router.post("/ocena/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, OcenaStavkaController.create);

router.put("/ocena/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosacOrAdmin, OcenaStavkaMiddleware.authorizedToUpdate, OcenaStavkaController.update);

router.delete("/ocena/:id", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosacOrAdmin, OcenaStavkaMiddleware.authorizedToDelete, OcenaStavkaController.delete)

module.exports = router;