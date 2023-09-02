import axios from "axios";
let token;
const BASE_URL = "http://localhost:5000/api";
const user = JSON.parse(localStorage.getItem("userInfo"));

if (!user) {
  console.log("No user found");
} else {
  token = user.userDetails.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${token}`,
  },
});
