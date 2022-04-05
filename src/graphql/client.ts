import { createClient } from "./generated";

const { accessToken } = JSON.parse(localStorage.getItem("authed")!);
console.log("token", accessToken);
export const client = createClient({
  url: "http://localhost:3000/graphql",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  },
});
