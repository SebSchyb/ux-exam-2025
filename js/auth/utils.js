import { regexEmail, regexPassword } from "./variables.js";
import { getUserByEmail } from "./api.js";

// FORMDATA VALIDATION
export const validateData = async (form, formData) => {
  // RETURNABLE ERROR OBJECT
  // will store registered errors from validation once returned
  const error = {};

  // GET VALUES FROM FORMDATA
  const email = formData.get("user_email");
  const password = formData.get("user_password");
  const passwordConfirm = formData.get("user_password_confirm");

  // MATCH FORMDATA EMAIL TO EMAIL IN DATABASE
  const existingUser = await getUserByEmail(email);

  // Variable stores the HTML-node (input field) being validated
  let targetInput;

  // VALIDATE LOGIN
  if (form.id === "login") {
    // VALIDATE EMAIL: if no email value or email doesn't exist in database
    if (!existingUser || email !== existingUser?.email) {
      error.email = "Please check your email and try again.";

      targetInput = form.querySelector("#user_email");
      displayError(targetInput, error.email);
    } else {
      // CLEAR ERROR IF INPUT IS VALID
      targetInput = form.querySelector("#user_email");
      clearError(targetInput);
    }

    // VALIDATE PASSWORD: if password value doesn't match value in database
    if (password !== existingUser?.password) {
      error.password = "Please check your password and try again.";

      targetInput = form.querySelector("#user_password");
      displayError(targetInput, error.password);
    } else {
      // CLEAR ERROR IF INPUT IS VALID
      targetInput = form.querySelector("#user_password");
      clearError(targetInput);
    }
  }

  // VALIDATE SIGNUP
  if (form.id === "signup") {
    // VALIDATE EMAIL
    if (!regexEmail.test(email) || existingUser) {
      targetInput = form.querySelector("#user_email");

      // if email is invalid (doesn't match regex)
      if (!regexEmail.test(email)) {
        error.email = "Please provide a valid email address.";

        //or if email already exists in database
      } else if (existingUser) {
        error.email = "Email already in use. Please choose another.";
      }

      displayError(targetInput, error.email);
    } else {
      // CLEAR ERROR IF INPUT IS VALID
      targetInput = form.querySelector("#user_email");
      clearError(targetInput);
    }

    // VALIDATE PASSWORD: if password is invalid (doesn't match regex)
    if (!regexPassword.test(password)) {
      error.password =
        "Password must be between 8-20 characters, and contain at least one upper- and lowercase character, one special character, and a number.";

      targetInput = form.querySelector("#user_password");
      displayError(targetInput, error.password);

      // DISPLAY ERROR ON CONFIRM PASSWORD WITHOUT ERROR MESSAGE
      targetInput = form.querySelector("#user_password_confirm");
      displayError(targetInput);
      return { email, password, error };
    } else {
      // CLEAR ERROR IF INPUT IS VALID
      targetInput = form.querySelector("#user_password");
      clearError(targetInput);
    }

    // CONFIRM PASSWORD: if password value and confirm password value from form don't match
    if (password !== passwordConfirm) {
      error.confirm = "Please confirm your password.";

      targetInput = form.querySelector("#user_password_confirm");
      displayError(targetInput, error.confirm);
    } else {
      // CLEAR ERROR IF INPUT IS VALID
      targetInput = form.querySelector("#user_password_confirm");
      clearError(targetInput);
    }
  }

  // RETURN ERRORS: if error obj contains any errors
  // return obj with validated formdata and errors
  if (error.email || error.password || error.confirm) {
    return { email, password, error };
  }

  // IF NO ERRORS: return only validated formdata
  return { email, password };
};

// DISPLAY ERRORS IN UI
export const displayError = (targetInput, message) => {
  // select HTML-element to display error message relative to input (targetInput)
  const errorLabel = targetInput.nextElementSibling;

  // add error styling
  targetInput.classList.add("error");
  // add error message
  errorLabel.textContent = !message ? "" : message;
};

// CLEAR ERROR IN UI
export const clearError = (targetInput) => {
  targetInput.classList.remove("error");
  targetInput.nextElementSibling.textContent = "";
};
