import {
  submitLogIn,
  submitSignOut,
  submit,
  displayUserList,
} from "./modules.js";
import { isLoginPage, isSignUpPage } from "./variables.js";

const pageForm = document.querySelector("form");
const SignOutButton = document.querySelector("#signOutBtn");
const WelcomeUser = document.querySelector("#userWelcome");

const authUser = localStorage.getItem("userEmail");
const signupStatus = localStorage.getItem("Status");

if (signupStatus) {
  // WelcomeUser.classList.remove("hide");
  // WelcomeUser.textContent = signupStatus;
  console.log(signupStatus);
  localStorage.clear();
}

if (isLoginPage || isSignUpPage) {
  pageForm.addEventListener("submit", submit);

  if (authUser) {
    window.location.replace("/");
  }
} else if (authUser) {
  WelcomeUser.querySelector("span").textContent = authUser;
  SignOutButton.addEventListener("click", submitSignOut);

  await displayUserList();
} else {
  WelcomeUser.classList.add("hide");
  SignOutButton.classList.add("hide");
}
