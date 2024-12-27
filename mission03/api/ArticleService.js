export const getArticleList = async (page, pageSize, keyword) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch article list: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getArticleList:", error);
    return null;
  }
};

export const getArticle = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/articles/${id}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getArticle:", error);
    return null;
  }
};

export const createArticle = async () => {
  try {
    const res = await fetch("https://sprint-mission-api.vercel.app/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "string",
        content: "string",
        image: "string",
      }),
    });
    if (!res.ok) {
      throw new Error(`Failed to create article: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in createArticle:", error);
    return null;
  }
};

export const patchArticle = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/articles/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "string",
          content: "string",
          image: "string",
        }),
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to update article: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in patchArticle:", error);
    return null;
  }
};

export const deleteArticle = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/articles/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to delete article: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in deleteArticle:", error);
    return null;
  }
};
