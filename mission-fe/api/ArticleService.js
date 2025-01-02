import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/articles",
  timeout: 5000,
});

// RESPONSE HANDLING (except for DELETE)
const handleResponse = async (res) => {
  const data = res.data;
  return data;
};

// ERROR HANDLING
const handleError = (error) => {
  if (error.response) {
    console.log(
      `Error ${error.response.status}: ${error.response.data.message}`
    );
  } else if (error.request) {
    console.log("No response", error.request);
  } else {
    console.log(error.message);
  }
};

// API (AXIOS, THEN CHAINING)
const getArticleList = (page = 1, pageSize = 100, keyword = "") => {
  const params = { page, pageSize, keyword };
  return apiClient.get("/", { params }).then(handleResponse).catch(handleError);
};

const getArticle = (id) => {
  return apiClient.get(`/${id}`).then(handleResponse).catch(handleError);
};

const createArticle = async (postArticleData) => {
  return apiClient
    .post("/", postArticleData)
    .then(handleResponse)
    .catch(handleError);
};

const patchArticle = (id, patchArticleData) => {
  return apiClient
    .patch(`/${id}`, patchArticleData)
    .then(handleResponse)
    .catch(handleError);
};

const deleteArticle = (id) => {
  return apiClient.delete(`/${id}`).then(handleResponse).catch(handleError);
};

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
