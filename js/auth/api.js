import { SERVER_URL } from "./variables.js";

// GET ALL USERS FROM JSON SERVER
export const getUsers = async () => {
  return await fetch(`${SERVER_URL}/users`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// GET USER BY EMAIL FROM JSON SERVER
export const getUserByEmail = async (email) => {
  const result = await fetch(`${SERVER_URL}/users?email=${email}`).then((res) =>
    res.json()
  );

  // returns first obj in array
  return result[0];
};

// POST NEW USER TO JSON SERVER
export const postUser = async (data) => {
  const user = await fetch(`${SERVER_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  // returns obj with user information and a status
  return { ...user, status: "OK" };
};
