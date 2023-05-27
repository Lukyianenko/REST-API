const express = require("express");
const {HttpError} = require("../../helpers");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../models/schemas");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication = require("../../middlewares/authentication");

const {SECRET_KEY} = process.env;

const router = express.Router();

router.post("/users/register", validateBody(registerSchema), async (req, res, next) => {
    try {
     const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        })
    } catch (error) {
        next(error);
      }
})

router.post("/users/login", validateBody(loginSchema), async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token})
    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
    }
    })
})

router.post("/users/current", authentication, async (req, res, next) => {
    const {email, subscription} = req.user;

    res.status(200).json({
        email,
        subscription,
    })
})

router.post("/users/logout", validateBody(loginSchema), async (req, res, next) => {
    const {_id} = req.user;

    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({
        message: "No Content"
    })
})



module.exports = router;