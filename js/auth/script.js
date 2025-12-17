import { submit, submitSignOut as signOut } from "./modules.js";
import { clearError } from "./utils.js";
import { isLoginPage, isSignUpPage } from "./variables.js";

// GRAB THE CURRENT PAGE'S FORM ELEMENT
const pageForm = document.querySelector("form");

// AUTH COMPONENTS
const headerActions = document.querySelector("header .header-actions");

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
}

if (authUser) {
	// IF A USER IS CURRENTLY SIGNED IN

	// create auth-scoped UI
	const userTag = document.createElement("p");
	const signOutButton = document.createElement("button");

	userTag.classList = "userTag";
	userTag.textContent = authUser;

	signOutButton.dataset.theme = "secondary";
	signOutButton.id = "signOutBtn";
	signOutButton.textContent = "Sign out";

	// display auth-scoped UI
	headerActions.appendChild(userTag);
	headerActions.appendChild(signOutButton);

	signOutButton.addEventListener("click", signOut);
} else {
	// PUBLIC PAGES: hide auth-scoped content when a user is not currently signed in

	// create public-scoped UI
	const signInButton = document.createElement("a");
	const registerButton = document.createElement("a");

	signInButton.dataset.theme = "primary";
	signInButton.classList = "btn";
	signInButton.href = "/signin.html";
	signInButton.textContent = "Sign in";

	registerButton.dataset.theme = "secondary";
	registerButton.classList = "btn";
	registerButton.href = "/register.html";
	registerButton.textContent = "Register";

	// display public-scoped UI
	headerActions.append(signInButton);
	headerActions.append(registerButton);
}
