const express = require('express')

const router = express.Router();
const Joi = require("joi");
const contacts = require("../../models/contacts");
const {HttpError} = require("../../helpers");


const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result);
  } catch (error) {
    next(error);
  }
  
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    if(!result) {
      const Error = new HttpError(404, "Not found");
      throw Error.getError();
    }
  res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      const Error = new HttpError(404, "missing required name field");
      throw Error.getError();
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      const Error = new HttpError(400, "missing required name field");
      throw Error.getError();
    }
    if(!req.body) {
      const Error = new HttpError(400, "missing fields");
      throw Error.getError();
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result) {
      const Error = new HttpError(404, "not Found");
      throw Error.getError();
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result) {
      const Error = new HttpError(404, "not Found");
      throw Error.getError();
    }
    res.json({
      message: "contact deleted"
    });
  } catch (error) {
    next(error);
  }
})



module.exports = router
