const gravatar = require("gravatar");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const {HttpError} = require("../../helpers");
equire("dotenv").config();

const register = async (req, res, next) => {
    try {
     const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword, avatarUrl});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        })
    } catch (error) {
        next(error);
      }
}

module.exports = register;