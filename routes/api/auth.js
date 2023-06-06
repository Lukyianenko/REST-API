const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../models/schemas");
const authentication = require("../../middlewares/authentication");
const register = require("../../controllers/auth/register");
const login = require("../../controllers/auth/login");
const current = require("../../controllers/auth/current");
const logout = require("../../controllers/auth/logout");
const upload = require("../../middlewares/upload");
const updateAvatar = require("../../controllers/auth/updateAvatar");

const router = express.Router();

router.post("/users/register", validateBody(registerSchema), register);

router.post("/users/login", validateBody(loginSchema), login);

router.post("/users/current", authentication, current);

router.post("/users/logout", authentication, logout);

router.patch("/users/avatars", authentication, upload.single("avatar"), updateAvatar);

module.exports = router;