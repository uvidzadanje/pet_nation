const express = require('express');
const OcenaPreduzeceController = require("../controller/ocena-preduzeca");
const AuthMiddleware = require("../middleware/auth");
const PotrosacMiddleware = require("../middleware/potrosac");
const OcenaPreduzeceMiddleware = require("../middleware/ocena-preduzece");

const router = express.Router();

router.get("/ocena/preduzece/:id", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, OcenaPreduzeceController.getByPotrosacSession);

router.post("/ocena/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, OcenaPreduzeceController.create);

router.put("/ocena/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosacOrAdmin, OcenaPreduzeceMiddleware.authorizedToUpdate, OcenaPreduzeceController.update);

router.delete("/ocena/:id", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosacOrAdmin, OcenaPreduzeceMiddleware.authorizedToDelete, OcenaPreduzeceController.delete);

module.exports = router;