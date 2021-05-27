const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInputForLab(data) {
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.labEmail = !isEmpty(data.labEmail) ? data.labEmail : "";
  data.labPassword = !isEmpty(data.labPassword) ? data.labPassword : "";// Email checks
  if (Validator.isEmpty(data.labEmail)) {
    errors.labEmail = "Email field is required";
  } else if (!Validator.isEmail(data.labEmail)) {
    errors.labEmail = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.labPassword)) {
    errors.labPassword = "Password field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};