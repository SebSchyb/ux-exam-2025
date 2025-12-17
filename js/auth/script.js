import { createElement } from "react";
import {
	submit,
	submitSignOut as signOut,
	displayUserList,
} from "./modules.js";
import { clearError } from "./utils.js";
import { isLoginPage, isSignUpPage } from "./variables.js";

// GRAB THE CURRENT PAGE'S FORM ELEMENT
const pageForm = document.querySelector("form");

// AUTH COMPONENTS
const headerActions = document.querySelector("header .header-actions");

const authHeader = document.querySelector("#auth");
const publicHeader = document.querySelector("#public");
const UserStatus = document.querySelector("#userStatus");

// LOCAL STORAGE
const authUser = localStorage.getItem("userEmail"); // email of user currently signed in
const signupStatus = localStorage.getItem("Status");

// if user has just signed up successfully, display status message
if (signupStatus) {
	UserStatus.classList.remove("hide");
	UserStatus.textContent = signupStatus;

	// remove status message
	// ensures that the message is only displayed immediately upon user signup
	localStorage.removeItem("Status");
}

// IF THE CURRENT PAGE IS LOGIN OR SIGNUP
if (isLoginPage || isSignUpPage) {
	// GRAB ALL INPUT FIELDS IN THE FORM
	const FormFields = pageForm.querySelectorAll("input");

	// for every input field, add a function to clear validation errors in the UI on blur
	FormFields.forEach((input) => {
		input.addEventListener("blur", (e) => {
			clearError(e.target);
		});
	});

	// IF LOGGED IN: redirect to index
	// if a user is currently signed in, they should not be able to access the login or signup page
	if (authUser) {
		window.location.replace("/");
	}

	// ADD SUBMIT EVENT TO CURRENT PAGE'S FORM
	pageForm.addEventListener("submit", submit);
} else if (authUser) {
	// IF A USER IS CURRENTLY SIGNED IN

	createElement("button", "data");

	// display auth-scoped UI
	headerActions.appendChild(`
		<button data-theme="secondary" id="signOutBtn">Sign out</button>`);

	const SignOutButton = document.querySelector("#signOutBtn");
	UserStatus.textContent = authUser;

	// display sign out button
	SignOutButton.addEventListener("click", signOut);
} else {
	// PUBLIC PAGES: hide auth-scoped content when a user is not currently signed in

	const test = `<a class="btn" data-theme="primary" href="/signin.html"
						>Sign in</a
					>
					<a class="btn" data-theme="secondary" href="/register.html"
						>Register</a
					>`;

	headerActions.append(test);

	// authHeader.classList.add("hide");
	// UserStatus.classList.add("hide");
	// SignOutButton.classList.add("hide");
}
