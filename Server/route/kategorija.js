const express = require("express");
const KategorijaController = require("../controller/kategorija");
const AuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/root", KategorijaController.getRootCategories);
router.get("/kategorija/:id", KategorijaController.get);
router.get("/", KategorijaController.getAll);
router.get("/:id", KategorijaController.getByKategorijaID);

router.post("/kategorija", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, KategorijaController.create);

router.put("/kategorija", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, KategorijaController.update);

router.delete("/kategorija/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, KategorijaController.delete);

module.exports = router;


