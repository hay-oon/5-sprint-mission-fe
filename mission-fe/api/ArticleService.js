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
const url = "https://sprint-mission-api.vercel.app/articles";

const getArticleList = (page = 1, pageSize = 100, keyword = "") => {
  const params = new URLSearchParams({ page, pageSize, keyword });
  return fetch(`${url}?${params.toString()}`)
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getArticle = (id) => {
  return fetch(`${url}/${id}`)
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const createArticle = async (title = "", content = "", image = "") => {
  const data = { title, content, image };
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const patchArticle = (id, patchArticleData) => {
  return fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchArticleData),
  })
    .then(handleResponse)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const deleteArticle = (id) => {
  return fetch(`${url}/${id}`, {
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
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
