import { getUsers, postUser } from "./api.js";
import { validateData } from "./utils.js";

// FORM SUBMIT EVENT
export const submit = async (e) => {
  e.preventDefault();

  // Store the targeted form and its data in variables
  const currentForm = e.target;
  const currentFormData = new FormData(currentForm);

  // VALIDATE FORMDATA
  // returns validated email, password, and registered errors
  const { email, password, error } = await validateData(
    currentForm,
    currentFormData
  );

  // IF FORMDATA IS INVALID, ABORT FORM SUBMISSION
  if (error) return;

  // LOGIN: if data is valid, user is successfully authenticated
  if (currentForm.id === "login") {
    // store user email in localStorage
    localStorage.setItem("userEmail", email);

    // redirect user to index
    window.location.replace("/");
  }

  // SIGNUP: if data is valid, user has successfully signed up
  if (currentForm.id === "signup") {
    try {
      // create a new user in database with validated data
      const response = await postUser({
        email: email,
        password: password,
      });

      if (response.status === "OK") {
        // if database post is successful, store a status message in localStorage
        localStorage.setItem(
          "Status",
          "Signup successful! Please sign in below."
        );

        // redirect the user to login where the status message from localStorage is displayed to the user
        window.location.replace("/login.html");
      }
    } catch (e) {
      console.error(e);
      // store a status message in localStorage
      localStorage.setItem("Status", "Something went wrong; please try again.");
      localStorage.setItem("Error", e);

      // reload the page to display the status message to the user
      window.location.reload();
    }
  }
};

// SIGNOUT
export const submitSignOut = () => {
  // remove user email from localStorage
  localStorage.removeItem("userEmail");

  // redirect to index
  window.location.replace("/");
};

// TEST: fetching and display of registered users
export const displayUserList = async () => {
  const data = await getUsers();

  const UserList = document.querySelector("#userList");
  const cardTemp = UserList.querySelector("template");

  data.forEach((user) => {
    const userCard = cardTemp.content.cloneNode(true);
    userCard.querySelector("p").textContent = user.email;
    UserList.append(userCard);
  });
};
