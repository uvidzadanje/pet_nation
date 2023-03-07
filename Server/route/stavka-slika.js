const express = require("express");
const StavkaSlikaController = require("../controller/stavka-slika");
const AuthMiddleware = require("../middleware/auth");
const PreduzeceMiddleware = require("../middleware/preduzece");
const StavkaSlikaMiddleware = require("../middleware/stavka-slika");
const ImageUpload = require("../middleware/image-upload");

const router = express.Router();

router.get("/stavka/:id", StavkaSlikaController.getByStavka);
router.get("/slika/:id", StavkaSlikaController.get);

router.post("/slika/", ImageUpload.single("stavka_image"), AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, StavkaSlikaMiddleware.authorizedToCreate, StavkaSlikaController.create);

router.delete("/slika/:id", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, StavkaSlikaMiddleware.authorizedToDelete, StavkaSlikaController.delete);

module.exports = router;