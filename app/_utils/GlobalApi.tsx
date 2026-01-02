// import axios from "axios";

// import { BASE_URL } from "@/lib/variables";

// const Base_URL = BASE_URL;
// if (!Base_URL) {
//   throw new Error(
//     "NEXT_PUBLIC_API_BASE_URL (BASE_URL) is not defined in the environment variables"
//   );
// }

// const axiosClient = axios.create({
//   baseURL: Base_URL,
// });

// // const getCategory = () => axiosClient.get("/categories");

// const getCategoryList = () =>
//   axiosClient.get("/store/categories/").then((res) => {
//     return res.data;
//   });
// const getSliders = () =>
//   axiosClient.get("/sliders?populate=*").then((resp) => {
//     return resp.data.results;
//   });

// const getProducts = () =>
//   axiosClient.get("/store/products/").then((res) => {
//     // console.log("res", res.data.results);

//     return res.data;
//   });

// const getProductByCategory = (slug: string) =>
//   axiosClient.get(`store/products/category/${slug}/`).then((res) => res.data);

// const addToCart = (data: unknown, jwt: string) =>
//   axiosClient.post("/store/user-cart/", data, {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   });

// const getToCart = (jwt: string) =>
//   axiosClient
//     .get("/store/user-cart/", {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     })
//     .then((res) => {
//       // console.log("cart=========", res?.data);
//       return res.data;
//     });

// const removeOneFormCart = (jwt: string, id: number) =>
//   axiosClient.delete(`/store/user-cart/${id}`, {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   });

// const removeAllFormCart = (jwt: string) =>
//   axiosClient.delete("/store/user-cart/", {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   });

// const GlobalApi = {
//   // getCategory,
//   getSliders,
//   getProducts,
//   getCategoryList,
//   getProductByCategory,
//   addToCart,
//   getToCart,
//   removeOneFormCart,
//   removeAllFormCart,
// };

// export default GlobalApi;
