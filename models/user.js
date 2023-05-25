const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegex,
        uniqeu: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    }
}, {versionKey: false, timestaps: true});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;