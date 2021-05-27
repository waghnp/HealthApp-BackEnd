const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInputForLab(data) {

  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.labName = !isEmpty(data.labName) ? data.labName : "";
  data.labEmail = !isEmpty(data.labEmail) ? data.labEmail : "";
  data.labContact=!isEmpty(data.labContact) ?data.labContact : "";
  data.labAddress=!isEmpty(data.labAddress) ?data.labAddress : "";
  data.labLocation=!isEmpty(data.labLocation) ?data.labLocation : "";
  data.labPassword = !isEmpty(data.labPassword) ? data.labPassword : "";
  data.labPassword2 = !isEmpty(data.labPassword2) ? data.labPassword2 : "";// Name checks
  if (Validator.isEmpty(data.labName)) {
    errors.labName = "Name field is required";
  }// Email checks
  if (Validator.isEmpty(data.labEmail)) {
    errors.labEmail = "Email field is required";
  } else if (!Validator.isEmail(data.labEmail)) {
    errors.labEmail = "Email is invalid";
  }
 
  if (Validator.isEmpty(data.labContact)) {
    errors.labContact = "Lab Contact field is required";
  } 
//   else if (data.mobileNum.isLength!=10) {
//     errors.mobileNum = "Mobile Number is invalid";
//   }
  if (Validator.isEmpty(data.labAddress)) {
    errors.labAddress = "Address field is required";
  }
  if (Validator.isEmpty(data.labLocation)) {
    errors.labLocation = "Location field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.labPassword)) {
    errors.labPassword = "Password field is required";
  }
  
  if (Validator.isEmpty(data.labPassword2)) {
    errors.labPassword2 = "Confirm password field is required";
  }
  
  if (!Validator.isLength(data.labPassword, { min: 6, max: 30 })) {
    errors.labPassword = "Password must be at least 6 characters";
  }
  
  if (!Validator.equals(data.labPassword, data.labPassword2)) {
    errors.labPassword2 = "Passwords must match";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};