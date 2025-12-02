import { regexEmail, regexPassword } from "./variables.js";
import { getUserByEmail } from "./api.js";

export const validateData = async (form, formData) => {
    const error = {};

    const email = formData.get("user_email");
    const password = formData.get("user_password");
    const passwordConfirm = formData.get("user_password_confirm");
    const existingUser = await getUserByEmail(email);

    let targetInput;

    // LOGIN
    if (form.id === "login") {
        if (!existingUser || email !== existingUser?.email) {
            error.email = "Please check your email and try again.";

            targetInput = form.querySelector("#user_email");
            displayError(targetInput, error.email);
        } else {
            targetInput = form.querySelector("#user_email");
            displayError(targetInput, false);
        }

        if (password !== existingUser?.password) {
            error.password = "Please check your password and try again.";

            targetInput = form.querySelector("#user_password");
            displayError(targetInput, error.password);
        } else {
            targetInput = form.querySelector("#user_password");
            displayError(targetInput, false);
        }
    }

    // SIGNUP
    if (form.id === "signup") {
        if (!regexEmail.test(email) || existingUser) {
            targetInput = form.querySelector("#user_email");

            if (!regexEmail.test(email)) {
                error.email = "Please provide a valid email address.";
            } else if (existingUser) {
                error.email = "Email already in use. Please choose another.";
            }

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
            displayError(targetInput, "");

            return { email, password, error };
        } else {
            targetInput = form.querySelector("#user_password");
            displayError(targetInput, false);
        }

        if (password !== passwordConfirm) {
            error.confirm = "Please confirm your password.";

            targetInput = form.querySelector("#user_password_confirm");
            displayError(targetInput, error.confirm);
        } else {
            targetInput = form.querySelector("#user_password_confirm");
            displayError(targetInput, false);
        }
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

export const clearError = (targetInput) => {
    targetInput.classList.remove("error");
    targetInput.nextElementSibling.textContent = "";
};
