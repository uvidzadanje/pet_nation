const express = require("express");
const PreduzeceController = require("../controller/preduzece");
const AuthMiddleware = require("../middleware/auth");
const PreduzeceMiddleware = require("../middleware/preduzece");
const ImageUpload = require("../middleware/image-upload");

const router = express.Router();

router.get("/", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, PreduzeceController.getAll);
router.get("/preduzece/:id", PreduzeceController.get);
router.get("/preduzece/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, PreduzeceController.getBySession);

router.put("/preduzece/slika", ImageUpload.single("profile_image"), AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, PreduzeceController.updateProfileImage);
router.put("/preduzece/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, PreduzeceController.update);
router.put("/preduzece/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, PreduzeceController.updateBySession);

// router.delete("/preduzece/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, PreduzeceController.delete);

module.exports = router;
