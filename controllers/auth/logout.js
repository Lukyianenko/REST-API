const User = require("../../models/user");
require("dotenv").config();

const logout = async (req, res, next) => {
    const {_id} = req.user;

    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({
        message: "No Content"
    })
}

module.exports = logout;