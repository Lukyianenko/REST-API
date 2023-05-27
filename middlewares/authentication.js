const HttpError = require("../helpers/HttpError");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;
const User = require("../models/user");

const authentication = async (req, res, next) => {
    const {autorization = ""} = req.headers;
    const [bearer, token] = autorization.split(" ");
    if(bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"))
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user) {
            next(HttpError(401, "Not authorized"))
        }
        req.user = user;
        next();
    }
    catch {
        next(HttpError(401, "Not authorized"))
    }
}

module.exports = authentication;