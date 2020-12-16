const Validator = require('validator')
const isEmpty = require("../is_empty")


module.exports = function validateReviewInput(data) {
  let errors = {};


  data.rating = !isEmpty(data.rating) ? data.rating : "";
  data.comment = !isEmpty(data.comment) ? data.comment : "";


  if (Validator.isEmpty(data.rating)) {
    errors.rating = "Rating field is required";
  }
  if (isNaN(Number(data.rating))) {
    errors.rating = "Must be a Number";
  }

  if (Validator.isEmpty(data.comment)) {
    errors.comment = "Comment field is required";
  }
  if (!Validator.isLength(data.comment, { min: 10, max: 250 })) {
    errors.comment = "Comment must be at least 10 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
