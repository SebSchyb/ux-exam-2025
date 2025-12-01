import { regexEmail, regexPassword } from "./variables.js";

// export const validateData = (email, pass, passCheck) => {
//   const error = {};

//   if (!regexEmail.test(email)) {
//     error.email = "Please provide a valid email address.";
//   }

//   if (!regexPassword.test(pass)) {
//     error.password =
//       "Password must be between 8-20 characters, and contain at least one upper- and lowercase character, one special character, and a number.";
//   }

//   if (pass !== passCheck) {
//     error.confirm = "Please confirm your password.";
//   }

//   return error;
// };
export const validateData = (form, formData) => {
  const error = {};

  const email = formData.get("user_email");
  const password = formData.get("user_password");
  const passwordConfirm = formData.get("user_password_confirm");

  let targetInput;

  if (!regexEmail.test(email)) {
    error.email = "Please provide a valid email address.";

    targetInput = form.querySelector("#user_email");
    displayError(targetInput, error.email);
  } else {
    targetInput = form.querySelector("#user_email");
    displayError(targetInput, false);
  }

  if (!regexPassword.test(password)) {
    error.password =
      "Password must be between 8-20 characters, and contain at least one upper- and lowercase character, one special character, and a number.";

    targetInput = form.querySelector("#user_password");
    displayError(targetInput, error.password);

    targetInput = form.querySelector("#user_password_confirm");
    displayError(targetInput);
  } else {
    targetInput = form.querySelector("#user_password");
    displayError(targetInput, false);
  }

  if (passwordConfirm && password !== passwordConfirm) {
    error.confirm = "Please confirm your password.";

    targetInput = form.querySelector("#user_password_confirm");
    displayError(targetInput, error.confirm);
  } else {
    targetInput = form.querySelector("#user_password_confirm");
    displayError(targetInput, false);
  }

  if (error.email || error.password || error.confirm) {
    return { email, password, error };
  }

  return { email, password };
};

export const displayError = (targetInput, message) => {
  const errorLabel = targetInput.nextElementSibling;

  targetInput.classList.add("error");
  errorLabel.textContent = message;

  if (message === false) {
    targetInput.classList.remove("error");
    errorLabel.textContent = "";
  }
};
