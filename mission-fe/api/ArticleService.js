import axios from "axios";

const url = "https://sprint-mission-api.vercel.app/articles";

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
  return axios.get(url, { params }).then(handleResponse).catch(handleError);
};

const getArticle = (id) => {
  return axios.get(`${url}/${id}`).then(handleResponse).catch(handleError);
};

const createArticle = async (title = "", content = "", image = "") => {
  const data = { title, content, image };
  return axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(handleResponse)
    .catch(handleError);
};

const patchArticle = (id, patchArticleData) => {
  return axios
    .patch(`${url}/${id}`, patchArticleData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(handleResponse)
    .catch(handleError);
};

const deleteArticle = (id) => {
  return axios
    .delete(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(`id(${id}) is successfully deleted !!!!!`);
    })
    .catch(handleError);
};

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
