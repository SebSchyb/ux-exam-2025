import { getUserByEmail, getUsers } from "./modules.js";

const logInForm = document.querySelector("#login");

const displayUserList = async () => {
  const data = await getUsers();

  const userList = document.querySelector("#users ul");
  const cardTemp = document.querySelector("template");

  data.forEach((user) => {
    const userCard = cardTemp.content.cloneNode(true);
    userCard.querySelector("p").textContent = user.email;
    userList.append(userCard);
  });
};

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(logInForm);

  const inputEmail = data.get("user_email");
  const inputPassword = data.get("user_email");

  console.log(typeof inputPassword);

  try {
    const user = await getUserByEmail(inputEmail);

    console.log(typeof user.password);

    if (inputPassword === user.password) {
      console.log("success");
    }
    console.log(user);
  } catch (e) {
    console.error(e);
  }
});

await displayUserList();
