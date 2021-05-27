const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {

  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.mobileNum=!isEmpty(data.mobileNum) ?data.mobileNum : "";
  data.adharNum=!isEmpty(data.adharNum) ?data.adharNum : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  console.log(data.mobileNum.isLength)
  
  if (Validator.isEmpty(data.mobileNum)) {
    errors.mobileNum = "Mobile Number field is required";
  } 
//   else if (data.mobileNum.isLength!=10) {
//     errors.mobileNum = "Mobile Number is invalid";
//   }
  if (Validator.isEmpty(data.adharNum)) {
    errors.adharNum = "Adhar Number field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};