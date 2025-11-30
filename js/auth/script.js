import { submitLogIn, submitSignUp } from "./modules.js";
import { getUsers } from "./api.js";

const LogInForm = document.querySelector("#login");
const SignUpForm = document.querySelector("#signup");

const displayUserList = async () => {
  const data = await getUsers();

  const userList = document.querySelector("#users ul");
  const cardTemp = document.querySelector("template#userItem");

  data.forEach((user) => {
    const userCard = cardTemp.content.cloneNode(true);
    userCard.querySelector("p").textContent = user.email;
    userList.append(userCard);
  });
};

LogInForm.addEventListener("submit", submitLogIn);

SignUpForm.addEventListener("submit", submitSignUp);

await displayUserList();
