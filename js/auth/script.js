import {
  submitLogIn,
  submitSignOut,
  submitSignUp,
  displayUserList,
} from "./modules.js";

const LogInForm = document.querySelector("#login");
const SignUpForm = document.querySelector("#signup");
const SignOutButton = document.querySelector("#signOutBtn");
const WelcomeUser = document.querySelector("#userWelcome");
const UserList = document.querySelector("#users ul");

const authUser = localStorage.getItem("userEmail");
const signupSuccess = localStorage.getItem("signup");

if (authUser) {
  WelcomeUser.querySelector("span").textContent = authUser;
  LogInForm.classList.add("hide");
  SignUpForm.classList.add("hide");
} else {
  SignOutButton.classList.add("hide");
  WelcomeUser.classList.add("hide");
  UserList.classList.add("hide");
}

if (signupSuccess) {
  WelcomeUser.classList.remove("hide");
  WelcomeUser.textContent = signupSuccess;
  localStorage.clear();
}

LogInForm.addEventListener("submit", submitLogIn);
SignUpForm.addEventListener("submit", submitSignUp);
SignOutButton.addEventListener("click", submitSignOut);

await displayUserList();
