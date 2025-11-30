import { SERVER_URL } from "./variables.js";

export const getUsers = async () => {
  return await fetch(`${SERVER_URL}/users`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getUserByEmail = async (email) => {
  const result = await fetch(`${SERVER_URL}/users?email=${email}`).then((res) =>
    res.json()
  );

  return result[0];
};

export const postUser = async (data) => {
  const user = await fetch(`${SERVER_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return { ...user, status: "OK" };
};
