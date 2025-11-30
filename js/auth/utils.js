import { regexEmail, regexPassword } from "./variables.js";

export const validateData = (email, pass, passCheck) => {
  const error = {};

  if (!regexEmail.test(email)) {
    error.email = "Please provide a valid email address.";
  }

  if (!regexPassword.test(pass)) {
    error.password =
      "Password must be between 8-20 characters, and contain at least one upper- and lowercase character, one special character, and a number.";
  }

  if (pass !== passCheck) {
    error.confirm = "Please confirm your password.";
  }

  return error;
};

export const displayError = (targetInput, message) => {
  const errorLabel = targetInput.nextElementSibling;

  targetInput.classList.add("error");
  errorLabel.textContent = message;
  targetInput.parentElement.append(errorLabel);
};
