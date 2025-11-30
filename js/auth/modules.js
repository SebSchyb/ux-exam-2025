import { getUsers, getUserByEmail, postUser } from "./api.js";
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
      localStorage.setItem("userEmail", user.email);
      window.location.replace("/login.html");
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
  const error = validateData(inputEmail, inputPassword, inputPasswordConfirm);
  let targetInput;

  if (error?.email || error?.password || error?.confirm) {
    if (error.email) {
      targetInput = e.target.querySelector("#signup_user_email");
      displayError(targetInput, error.email);
    }
    if (error.password) {
      targetInput = e.target.querySelector("#signup_user_password");
      displayError(targetInput, error.password);

      targetInput = e.target.querySelector("#signup_user_password_confirm");
      displayError(targetInput, "");
    }
    if (error.confirm) {
      targetInput = e.target.querySelector("#signup_user_password_confirm");
      displayError(targetInput, error.confirm);
    }
    return;
  }

  try {
    const existingUser = await getUserByEmail(inputEmail);

    if (existingUser) {
      targetInput = e.target.querySelector("#signup_user_email");
      displayError(targetInput, "Email already in use. Please choose another.");
      return;
    }

    const response = await postUser({
      email: inputEmail,
      password: inputPassword,
    });

    if (response.status === "OK") {
      localStorage.setItem(
        "signup",
        "Signup successful! Please sign in below."
      );
      window.location.replace("/login.html");
    }
  } catch (e) {
    console.error(e);
    localStorage.setItem("signup", "Something went wrong; please try again.");
    window.location.replace("/login.html");
  }
};

export const submitSignOut = () => {
  localStorage.clear();
  window.location.replace("/login.html");
};

export const displayUserList = async () => {
  const data = await getUsers();

  const UserList = document.querySelector("#users ul");
  const cardTemp = document.querySelector("template#userItem");

  data.forEach((user) => {
    const userCard = cardTemp.content.cloneNode(true);
    userCard.querySelector("p").textContent = user.email;
    UserList.append(userCard);
  });
};
