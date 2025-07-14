import axios from "axios";
// import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc1MjQ2MjgxMSwiZXhwIjoxNzUyNDY2NDExfQ.DRbTUjtuAn3ykCjRNHIDXaDmu0DBxmp53o0QK4YfhFg`,
    // Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

export default api;
