export const getArticleList = async (page, pageSize, keyword) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Error ${res.status}: ${errorMessage}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getArticle = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/articles/${id}`
    );
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Error ${res.status}: ${errorMessage}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
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
      const errorMessage = await res.text();
      throw new Error(`Error ${res.status}: ${errorMessage}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
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
      const errorMessage = await res.text();
      throw new Error(`Error ${res.status}: ${errorMessage}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
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
      const errorMessage = await res.text();
      throw new Error(`Error ${res.status}: ${errorMessage}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
