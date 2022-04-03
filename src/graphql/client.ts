import { createClient } from "./generated";

export const client = createClient({
  url: "http://localhost:3000/graphql",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlcnRoaW8xIiwic3ViIjoiNjI0N2QzMWYyYjBkNzE1NGYzYjAzNjAyIiwiaWF0IjoxNjQ4OTUwMzU0LCJleHAiOjE2NDk1NTUxNTR9.5oJbLmAbLNuGrS_DyHJrbqDlreBUTVwEpz-Pt-dxKtQ",
  },
});
