import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("http://localhost:8000/users/signin", formData);
export const signUp = (formData) => API.post("http://localhost:8000/users/signup", formData);
export const googleSignIn = (result) => API.post("http://localhost:8000/users/googleSignIn", result);

export const createTour = (tourData) => API.post("http://localhost:8000/tour/", tourData);
export const getTours = (page) => API.get(`http://localhost:8000/tour?page=${page}`);
export const getTour = (id) => API.get(`http://localhost:8000/tour/${id}`);
export const deleteTour = (id) => API.delete(`http://localhost:8000/tour/${id}`);
export const updateTour = (updatedTourData, id) =>
  API.patch(`http://localhost:8000/tour/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`http://localhost:8000/tour/userTours/${userId}`);

export const getToursBySearch = (searchQuery) =>
  API.get(`http://localhost:8000/tour/search?searchQuery=${searchQuery}`);

export const getTagTours = (tag) => API.get(`http://localhost:8000/tour/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`http://localhost:8000/tour/relatedTours`, tags);
export const likeTour = (id) => API.patch(`http://localhost:8000/tour/like/${id}`);
