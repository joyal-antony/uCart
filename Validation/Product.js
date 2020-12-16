const Validator = require('validator')
const isEmpty = require("../is_empty")


module.exports = function validateProductInput(data) {
  let errors = {};


  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.brand = !isEmpty(data.brand) ? data.brand : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.countInStock = !isEmpty(data.countInStock) ? data.countInStock : "";
  // data.image = !isEmpty(data.image) ? data.image : "";


  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = "Description must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (Validator.isEmpty(data.brand)) {
    errors.brand = "Brand field is required";
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  // if (Validator.isEmpty(data.countInStock)) {
  //   errors.countInStock = "CountInStock field is required";
  // }

  // if (Validator.isEmpty(data.image)) {
  //   errors.image = "Image field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
