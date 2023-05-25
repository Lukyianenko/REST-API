const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../models/schemas");
const User = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), async (req, res, next) => {
    try {
    const newUser = await User.create(req.body);

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
        })
    } catch (error) {
        next(error);
      }
})

module.exports = router;