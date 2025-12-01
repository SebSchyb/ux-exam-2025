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

export const submit = async (e) => {
  e.preventDefault();

  const currentForm = e.target;
  const currentFormData = new FormData(currentForm);

  const { email, password, error } = validateData(currentForm, currentFormData);

  if (error) return;

  try {
  if (currentForm.id === "signup") {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      const error = "Email already in use. Please choose another.";
      targetInput = currentForm.querySelector("#user_email");
      displayError(targetInput, error);
      return;
    }

    const response = await postUser({
      email: email,
      password: password,
    });

    if (response.status === "OK") {
      localStorage.setItem(
        "Status",
        "Signup successful! Please sign in below."
      );
      // window.location.replace("/login.html");
    }}
  } catch (e) {
    console.error(e);
    localStorage.setItem("Status", "Something went wrong; please try again.");
    localStorage.setItem("Details", e);
    // window.location.replace("/signup.html");
  }
    const response = await submitSignUp(email, password).then((res) =>
      res.json()
    );
    console.log(response);

    if (response.error) return;

    window.location.replace("/login.html");
  }

  window.location.replace("/");
};

const submitSignUp = async (email, password) => {
  
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
