import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",

  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// api.interceptors.request.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//          const { data: tokenData } = await axios
//           .get("/auth/refresh-token", {
//             headers: { Authorization: `Bearer ${refreshToken}` },
//           })
//           .then(({ data }) => data)
//           .catch(() => {
//             console.log("error refresh");
//           });

//         originalRequest.headers.Authorization = `Bearer ${tokenData}`;
//         return axios(originalRequest);
//       } catch (err) {
//         console.log("Erro on refresh token", error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
