const express = require("express");
const KorpaController = require("../controller/korpa");
const PotrosacMiddleware = require("../middleware/potrosac");
const KorpaMiddleware = require("../middleware/korpa");
const AuthMiddleware = require("../middleware/auth");
const PreduzeceMiddleware = require("../middleware/preduzece");

const router = express.Router();

router.get("/", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, KorpaController.getAll);
// router.get("/korpa/:id", AuthMiddleware.isAuthentificated, KorpaMiddleware.authorizedToGet, KorpaController.get);
router.get("/preduzece/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, KorpaController.getByPreduzeceSession);
router.get("/potrosac/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, KorpaController.getByPotrosacSession);

router.post("/korpa/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, KorpaController.validateCreate, KorpaController.create);

router.put("/korpa/", AuthMiddleware.isAuthentificated, KorpaMiddleware.authorizedToUpdate, KorpaController.validateUpdate, KorpaController.update);

router.delete("/korpa/:id", AuthMiddleware.isAuthentificated, KorpaMiddleware.authorizedToDelete, KorpaController.delete);

module.exports = router;


