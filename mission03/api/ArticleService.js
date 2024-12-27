export const getArticleList = (page, pageSize, keyword) => {
  try {
    return fetch(
      `https://sprint-mission-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    ).then((res) => {
      if (!res.ok) {
        return res.text().then((errorMessage) => {
          throw new Error(`Error ${res.status}: ${errorMessage}`);
        });
      }
      return res.json();
    });
  } catch (error) {
    console.error("Error in getArticleList:", error);
    throw error;
  }
};

export const getArticle = (id) => {
  try {
    return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`).then(
      (res) => {
        if (!res.ok) {
          return res.text().then((errorMessage) => {
            throw new Error(`Error ${res.status}: ${errorMessage}`);
          });
        }
        return res.json();
      }
    );
  } catch (error) {
    console.error("Error in getArticle:", error);
    throw error;
  }
};

export const createArticle = () => {
  try {
    return fetch("https://sprint-mission-api.vercel.app/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "string",
        content: "string",
        image: "string",
      }),
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((errorMessage) => {
          throw new Error(`Error ${res.status}: ${errorMessage}`);
        });
      }
      return res.json();
    });
  } catch (error) {
    console.error("Error in createArticle:", error);
    throw error;
  }
};

export const patchArticle = (id) => {
  try {
    return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "string",
        content: "string",
        image: "string",
      }),
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((errorMessage) => {
          throw new Error(`Error ${res.status}: ${errorMessage}`);
        });
      }
      return res.json();
    });
  } catch (error) {
    console.error("Error in patchArticle:", error);
    throw error;
  }
};

export const deleteArticle = (id) => {
  try {
    return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((errorMessage) => {
          throw new Error(`Error ${res.status}: ${errorMessage}`);
        });
      }
      return res.json();
    });
  } catch (error) {
    console.error("Error in deleteArticle:", error);
    throw error;
  }
};
