import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/products",
  timeout: 5000,
});

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

// FETCHING API
const getProductList = async (page = 1, pageSize = 100, keyword = "") => {
  try {
    const params = { page, pageSize, keyword };
    const res = await apiClient.get("/", { params });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const getProduct = async (id) => {
  try {
    const res = await apiClient.get(`/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const createProduct = async (postProductData) => {
  try {
    const res = await apiClient.post("/", postProductData);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const patchProduct = async (id, patchProductData) => {
  try {
    const res = await apiClient.patch(`/${id}`, patchProductData);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await apiClient.delete(`/${id}`);
    console.log(`Error ${res.status}: ${id} is successfully deleted !!!!!`);
  } catch (error) {
    handleError(error);
  }
};

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
