const express = require('express');
const StavkaController = require("../controller/stavka");
const AuthMiddleware = require("../middleware/auth");
const PreduzeceMiddleware = require("../middleware/preduzece");
const StavkaMiddleware = require("../middleware/stavka");

const router = express.Router();

router.get("/", AuthMiddleware.isAuthentificated, AuthMiddleware.isAdmin, StavkaController.getAll);
router.get("/stavka/:id", StavkaController.get);

router.post("/stavka/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzece, StavkaController.validateCreate, StavkaController.create);

router.put("/stavka/", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, StavkaMiddleware.authorizedToUpdate, StavkaController.validateUpdate, StavkaController.update);

router.delete("/stavka/:id", AuthMiddleware.isAuthentificated, PreduzeceMiddleware.isPreduzeceOrAdmin, StavkaMiddleware.authorizedToDelete, StavkaController.delete);

module.exports = router;