export const SERVER_URL = "http://localhost:3000";

// VALIDATION REGEX
export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;

// URL CHECK
export const isLoginPage = window.location.href.includes("login");
export const isSignUpPage = window.location.href.includes("signup");
