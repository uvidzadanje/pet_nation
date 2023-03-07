const express = require("express");
const PotrosacController = require("../controller/potrosac");
const AuthMiddleware = require("../middleware/auth");
const PotrosacMiddleware = require("../middleware/potrosac");

const router = express.Router();

router.get("/", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, PotrosacController.getAll);
router.get("/potrosac/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, PotrosacController.get);
router.get("/potrosac/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac,PotrosacController.getBySession);

router.put("/potrosac/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, PotrosacController.update);
router.put("/potrosac/", AuthMiddleware.isAuthentificated, PotrosacMiddleware.isPotrosac, PotrosacController.updateBySession);

// router.delete("/potrosac/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, PotrosacController.delete);

module.exports = router;
