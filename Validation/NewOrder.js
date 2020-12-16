const Validator = require('validator')
const isEmpty = require("../is_empty")


module.exports = function validateOrderInput(data) {
  let errors = {};



  data.shipping.address = !isEmpty(data.shipping.address) ? data.shipping.address : "";
  data.shipping.city = !isEmpty(data.shipping.city) ? data.shipping.city : "";
  data.shipping.postalcode = !isEmpty(data.shipping.postalcode) ? data.shipping.postalcode : "";
  data.shipping.country = !isEmpty(data.shipping.country) ? data.shipping.country : "";


  data.payment = !isEmpty(data.payment) ? data.payment : "";

  if (data.orderItems && data.orderItems.length === 0) {
    errors.product = 'No order items'
  }

  if (Validator.isEmpty(data.shipping.address)) {
    errors.shipping.address = "Shipping Address field not found";
  }
  if (Validator.isEmpty(data.shipping.city)) {
    errors.shipping.city = "Shipping city field not found";
  }
  if (Validator.isEmpty(data.shipping.postalcode)) {
    errors.shipping.postalcode = "Shipping postalcode field not found";
  }
  if (Validator.isEmpty(data.shipping.country)) {
    errors.shipping.country = "Shipping country field not found";
  }

  if (Validator.isEmpty(data.payment)) {
    errors.payment = "Payment method not found";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
