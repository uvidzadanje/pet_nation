const express = require("express");
const UserController = require("../controller/user");
const AuthMiddleware = require("../middleware/auth");
const ImageUpload = require("../middleware/image-upload");

const router = express.Router();

router.get("/user/auth", UserController.getAuth);
router.get("/", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, UserController.getAll);
router.get("/user/:id", UserController.get);
router.get("/user/", AuthMiddleware.isAuthentificated, UserController.getBySession);

router.post("/user/", ImageUpload.single("profile_image"), UserController.validateRegister, UserController.register);
router.post("/user/auth", UserController.validateLogin ,UserController.login);
router.post("/user/logout", UserController.logout);
router.post("/user/admin", /* UserController.validateRegister, */ UserController.registerAdmin);

router.put("/user/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, UserController.update);
router.put("/user/", AuthMiddleware.isAuthentificated, UserController.validateUpdate, UserController.updateBySession);

router.delete("/user/:id", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, UserController.delete);
router.delete("/user/", AuthMiddleware.isAuthentificated, UserController.deleteBySession);

module.exports = router;
