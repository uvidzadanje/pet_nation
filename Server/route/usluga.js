const express = require('express');
const UslugaController = require("../controller/usluga");
const AuthMiddleware = require("../middleware/auth");
const PreduzeceMiddleware = require("../middleware/preduzece");
const UslugaMiddleware = require("../middleware/usluga");

const router = express.Router();

router.get("/preduzece/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, UslugaController.getByPreduzeceSession);
router.get("/preduzece/:id", UslugaController.getByPreduzece);
router.get("/usluga/:id", UslugaController.get);
router.get("/", UslugaController.getAllByFilters);

// router.post("/usluga/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, UslugaController.create);

router.put("/usluga/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, UslugaMiddleware.authorizedToUpdate, UslugaController.validateUpdate, UslugaController.update);

router.delete("/usluga/:id", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, UslugaMiddleware.authorizedToDelete, UslugaController.delete);

module.exports = router;