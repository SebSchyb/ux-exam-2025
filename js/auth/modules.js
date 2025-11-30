import { SERVER_URL } from "./variables.js";

export const getUsers = async (endpoint) => {
  return await fetch(`${SERVER_URL}/users`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const userSignUp = async (userData) => {
  return await fetch(`${SERVER_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: userData,
  }).then((res) => res.json());
};

export const getUserByEmail = async (email) => {
  const user = await fetch(`${SERVER_URL}/users?email=${email}`).then((res) =>
    res.json()
  );

  return user[0];
};
