const url = "https://sprint-mission-api.vercel.app/products";

const getProductList = async (page = 1, pageSize = 100, keyword = " ") => {
  const params = new URLSearchParams({ page, pageSize, keyword });
  try {
    const res = await fetch(`${url}?${params}`);
    const result = await res.json();
    return result;
  } catch (e) {
    return console.log("error : ", e);
  }
};
const getProduct = async (id) => {
  try {
    const res = await fetch(url + "/" + id);
    const result = await res.json();
    return result;
  } catch (e) {
    return console.log("error : ", e);
  }
};
const createProduct = async (
  name = "",
  description = "",
  price = 0,
  tags = [""],
  images = [""]
) => {
  const data = { name, description, price, tags, images };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("error :", error);
  }
};

const patchProduct = async (id, name, description, price, tags, images) => {
  const data = { name, description, price, tags, images };
  try {
    const res = await fetch(url + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("error :", error);
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await fetch(url + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
  } catch (error) {
    console.log("error :", error);
  }
};

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
