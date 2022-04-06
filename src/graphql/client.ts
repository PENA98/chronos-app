import { createClient } from "./generated";

let bearerToken = "";
try {
  const { accessToken } = JSON.parse(localStorage.getItem("authed")!);
  bearerToken = accessToken
  
} catch (error) {
  console.log("error", error);
}

export const client = createClient({
  url: `${process.env.REACT_APP_API_URI}/graphql`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
});