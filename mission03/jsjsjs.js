const url = "https://sprint-mission-api.vercel.app/articles";

const getArticleList = (page = 1, pageSize = 100, keyword = " ") => {
  const params = new URLSearchParams({ page, pageSize, keyword });
  return fetch(`${url}?${params}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("API 호출 실패");
      }
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.log("error : ", e);
    });
};

const getArticle = async (id) => {
  try {
    const res = await fetch(url + "/" + id);
    const result = await res.json();
    return result;
  } catch (e) {
    return console.log("error : ", e);
  }
};

const createArticle = async (title = "", content = "", image = "") => {
  const data = { title, content, image };
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

const patchArticle = async (id = 0, title = "", content = "", image = "") => {
  const data = { title, content, image };
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

const deleteArticle = async (id) => {
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
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
