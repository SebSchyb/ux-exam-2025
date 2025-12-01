import {
  submit,
  submitSignOut as signOut,
  displayUserList,
} from "./modules.js";
import { isLoginPage, isSignUpPage } from "./variables.js";

const pageForm = document.querySelector("form");

const authHeader = document.querySelector("#auth");
const publicHeader = document.querySelector("#public");
const SignOutButton = document.querySelector("#signOutBtn");
const UserStatus = document.querySelector("#userStatus");

const authUser = localStorage.getItem("userEmail");
const signupStatus = localStorage.getItem("Status");

if (signupStatus) {
  UserStatus.classList.remove("hide");
  UserStatus.textContent = signupStatus;
  localStorage.removeItem("Status");
}

if (isLoginPage || isSignUpPage) {
  if (authUser) {
    window.location.replace("/");
  }

  pageForm.addEventListener("submit", submit);
} else if (authUser) {
  publicHeader.classList.add("hide");
  UserStatus.textContent = authUser;
  SignOutButton.addEventListener("click", signOut);

  await displayUserList();
} else {
  authHeader.classList.add("hide");
  UserStatus.classList.add("hide");
  SignOutButton.classList.add("hide");
}
