import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/products",
});

// REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    // console.log(808);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // console.log(909);
    console.log(error.response.data);
    return Promise.reject(error.response.data);
  }
);

// API
const getProductList = async (page = 1, pageSize = 100, keyword = "") => {
  const params = { page, pageSize, keyword };
  try {
    return await apiClient.get("/", { params });
  } catch (error) {
    // console.error("Error in getProductList:", error);
    // throw error;
  }
};

const getProduct = async (id) => {
  try {
    // throw error("good");
    return await apiClient.get(`/${id}`);
  } catch (error) {
    // console.log("Error in getProduct:", error); //try 문에서 새로 생성한 new Error 객체가 전달, 해당 코드에는 interceptor에서 처리한 axios 에러 메세지가 중복되어 주석처리
    // console.log(error.response.data); // AXIOS에서 발생한 에러이므로 인터셉터로 이동
    // throw error;
  }
};

const createProduct = async (postProductData) => {
  try {
    return await apiClient.post("/", postProductData);
  } catch (error) {
    // console.error("Error in createProduct:", error);
    // throw error;
  }
};

const patchProduct = async (id, patchProductData) => {
  try {
    return await apiClient.patch(`/${id}`, patchProductData);
  } catch (error) {
    // console.error("Error in patchProduct:", error);
    // throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
    console.log(`Product with ID ${id} is successfully deleted!`);
  } catch (error) {
    // console.error("Error in deleteProduct:", error);
    // throw error;
  }
};

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
