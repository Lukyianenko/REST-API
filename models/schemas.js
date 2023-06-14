const Joi = require("joi");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
    
})

const updateFavoriteSchema = Joi.object({
favorite: Joi.boolean().required,
})

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
})

const emailSchems = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
})

module.exports = {
    addSchema,
    updateFavoriteSchema,
    emailSchems,
    registerSchema,
    loginSchema,
}