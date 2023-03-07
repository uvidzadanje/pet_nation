const express = require('express');
const KupovinaController = require("../controller/kupovina");
const KupovinaMiddleware = require("../middleware/kupovina");
const AuthMiddleware = require("../middleware/auth");
const PotrosacMiddleware = require("../middleware/potrosac");
const PreduzeceMiddleware = require("../middleware/preduzece");

const router = express.Router();

router.get("/korpa/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, KupovinaController.getByKorpaID);

// router.get("/korpa/:korpaID/preduzece/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, KupovinaController.getByPreduzeceIDAndKorpaID);

router.post("/kupovina/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, KupovinaController.create);

router.put("/kupovina/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosacOrAdmin, KupovinaMiddleware.authorizedToUpdate, KupovinaController.update);

router.delete("/kupovina/:id", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosacOrAdmin, KupovinaMiddleware.authorizedToDelete, KupovinaController.delete);

module.exports = router;