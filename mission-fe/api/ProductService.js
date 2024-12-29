import axios from "axios";

const url = "https://sprint-mission-api.vercel.app/products";

// ERROR HANDLING
const handleError = (error) => {
  if (error.response) {
    console.log(
      `Error ${error.response.status}: ${JSON.stringify(error.response.data)}`
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
    const res = await axios.get(url, { params });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const getProduct = async (id) => {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const createProduct = async (postProductData) => {
  try {
    const res = await axios.post(url, postProductData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const patchProduct = async (id, patchProductData) => {
  try {
    const res = await axios.patch(`${url}/${id}`, patchProductData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
