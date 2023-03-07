const express = require("express");
const ZakazivanjeController = require("../controller/zakazivanje");
const PotrosacMiddleware = require("../middleware/potrosac");
const ZakazivanjeMiddleware = require("../middleware/zakazivanje");
const PreduzeceMiddleware = require("../middleware/preduzece");
const AuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, ZakazivanjeController.getAll);
// router.get("/zakazivanje/:id", AuthMiddleware.isAuthentificated, ZakazivanjeMiddleware.authorizedToGet, ZakazivanjeController.get);
router.get("/preduzece/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, ZakazivanjeController.getByPreduzeceSession);
router.get("/potrosac/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, ZakazivanjeController.getByPotrosacSession);

router.post("/zakazivanje/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, ZakazivanjeController.validateCreate, ZakazivanjeController.create);

router.put("/zakazivanje/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosacOrAdmin, ZakazivanjeMiddleware.authorizedToUpdate, ZakazivanjeController.validateUpdate, ZakazivanjeController.update);

router.delete("/zakazivanje/:id", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosacOrAdmin, ZakazivanjeMiddleware.authorizedToDelete, ZakazivanjeController.delete);

module.exports = router;