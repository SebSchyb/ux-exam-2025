import { getUsers, postUser } from "./api.js";
import { validateData } from "./utils.js";

export const submit = async (e) => {
  e.preventDefault();

  const currentForm = e.target;
  const currentFormData = new FormData(currentForm);

  const { email, password, error } = await validateData(
    currentForm,
    currentFormData
  );

  if (error) return;

  if (currentForm.id === "login") {
    localStorage.setItem("userEmail", email);
    window.location.replace("/");
  }

  if (currentForm.id === "signup") {
    try {
      const response = await postUser({
        email: email,
        password: password,
      });

      if (response.status === "OK") {
        localStorage.setItem(
          "Status",
          "Signup successful! Please sign in below."
        );
        window.location.replace("/login.html");
      }
    } catch (e) {
      console.error(e);
      localStorage.setItem("Status", "Something went wrong; please try again.");
      localStorage.setItem("Error", e);

      window.location.reload();
    }
  }
};

export const submitSignOut = () => {
  localStorage.removeItem("userEmail");
  window.location.replace("/");
};

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
