import { getUserByEmail, postUser } from "./api.js";
import { validateData, displayError } from "./utils.js";

export const submitLogIn = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);

  const inputEmail = data.get("user_email");
  const inputPassword = data.get("user_password");

  try {
    const user = await getUserByEmail(inputEmail);

    let targetInput;
    let error;

    if (!user || inputEmail !== user?.email) {
      targetInput = e.target.querySelector("#login_user_email");
      error = "Please check your email and try again.";
      displayError(targetInput, error);
    }

    if (inputPassword !== user?.password) {
      targetInput = e.target.querySelector("#login_user_password");
      error = "Please check your password and try again.";
      displayError(targetInput, error);
    } else {
      console.log("User login successful.");
      // store user in localStorage
      // redirect to auth scoped content
      window.location.replace("/");
    }
  } catch (e) {
    console.error(e);
  }
};

export const submitSignUp = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);

  const inputEmail = data.get("user_email");
  const inputPassword = data.get("user_password");
  const inputPasswordConfirm = data.get("user_password_confirm");

  // FORM VALIDATION
  const { email, password, confirm } = validateData(
    inputEmail,
    inputPassword,
    inputPasswordConfirm
  );

  let targetInput;

  if (email) {
    targetInput = e.target.querySelector("#signup_user_email");
    displayError(targetInput, email);
  }
  if (password) {
    targetInput = e.target.querySelector("#signup_user_password");
    displayError(targetInput, password);

    targetInput = e.target.querySelector("#signup_user_password_confirm");
    displayError(targetInput, "");
  }
  if (confirm) {
    targetInput = e.target.querySelector("#signup_user_password_confirm");
    displayError(targetInput, confirm);
  }

  try {
    // const user = await postUser({ email: inputEmail, password: inputPassword });
    // console.log("post result:", user);
    // if (!user) {
    //   console.log("User doesn't exist.");
    //   return { error: "User doesn't exist." };
    // }
    // window.location.replace("/");
  } catch (e) {
    console.error(e);
  }
};
