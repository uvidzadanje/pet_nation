const express = require('express');
const ProizvodController = require("../controller/proizvod");
const AuthMiddleware = require("../middleware/auth");
const PreduzeceMiddleware = require("../middleware/preduzece");
const ProizvodMiddleware = require("../middleware/proizvod");

const router = express.Router();

router.get("/preduzece/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, ProizvodController.getByPreduzeceSession);
router.get("/preduzece/:id", ProizvodController.getByPreduzece);
router.get("/proizvod/:id", ProizvodController.get);
router.get("/", ProizvodController.getAllByFilters);

// router.post("/proizvod/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, ProizvodController.create);

router.put("/proizvod/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, ProizvodMiddleware.authorizedToUpdate, ProizvodController.validateUpdate, ProizvodController.update);

router.delete("/proizvod/:id", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, ProizvodMiddleware.authorizedToDelete, ProizvodController.delete);

module.exports = router;