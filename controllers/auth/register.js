const gravatar = require("gravatar");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const {HttpError} = require("../../helpers");
require("dotenv").config();
const {nanoid} = require("nanoid");
const sendEmail = require("../../helpers/sendEmail");

const {BASE_URL} = process.env;

const register = async (req, res, next) => {
    try {
     const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Click verify email</a>`,
    }; 

    await sendEmail(verifyEmail);
   
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        })
    } catch (error) {
        next(error);
      }
}

module.exports = register;