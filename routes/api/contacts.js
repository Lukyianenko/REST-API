const express = require('express')
const {Contact} = require("../../models/contact");
const {addSchema, updateFavoriteSchema} = require("../../models/schemas");
const isValidId = require("../../middlewares/isValidId");
const authentication = require("../../middlewares/authentication");

const router = express.Router();
const {HttpError} = require("../../helpers");

router.get('/', authentication, async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "", {skip, limit}).populate("owner", "name email");
  res.json(result);
  } catch (error) {
    next(error);
  }
  
})

router.get('/:id', authentication, isValidId, async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await Contact.findById(id);
    if(!result) {
      throw HttpError(404, "Not found")
    }
  res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', authentication, async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.put('/:id', authentication, isValidId, async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, "missing required name field");
    }
    if(!req.body) {
      throw HttpError(400, "missing fields");
    }
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
      throw HttpError(404, "not Found");
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.patch('/:id/favorite', authentication, isValidId, async (req, res, next) => {
  try {
    const {error} = updateFavoriteSchema.validate(req.body);
    if(error) {
      throw HttpError(400, "missing required name field");
    }
      const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
      throw HttpError(404, "Not found")
    }
  res.json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', authentication, isValidId, async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if(!result) {
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "contact deleted"
    });
  } catch (error) {
    next(error);
  }
})



module.exports = router;
