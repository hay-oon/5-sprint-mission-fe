// RESPONSE HANDLING (except for DELETE)
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorMessage = await res.text();
    console.log(`Error ${res.status}: ${errorMessage}`);
    return { error: true, status: res.status };
  }
  const data = res.json();
  return data;
};

// FETCHING API
const getProductList = async (page = 1, pageSize = 100, keyword = "") => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    return await handleResponse(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getProduct = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`
    );
    return await handleResponse(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createProduct = async (postProductData) => {
  try {
    const res = await fetch("https://sprint-mission-api.vercel.app/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postProductData),
    });
    return await handleResponse(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const patchProduct = async (id, patchProductData) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchProductData),
      }
    );
    return await handleResponse(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProduct = (id) => {
  return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log(`Error ${res.status}: ${id} is not founded :((((( `);
        return { success: false, status: res.status };
      }
      console.log(`Error ${res.status}: ${id} is successfully deleted !!!!!`);
      return { success: true, status: res.status };
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
