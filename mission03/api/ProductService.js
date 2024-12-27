// [ ]  구현한 함수들을 아래와 같이 파일을 분리해 주세요.

// [ ] export를 활용해 주세요.
// [ ] ProductService.js 파일 Product API 관련 함수들을 작성해 주세요.
// [ ] ArticleService.js 파일에 Article API 관련 함수들을 작성해 주세요.
// [ ]  이외의 코드들은 모두 main.js 파일에 작성해 주세요.

// [ ] import를 활용해 주세요.
// [ ] 각 함수를 실행하는 코드를 작성하고, 제대로 동작하는지 확인해 주세요.

export const getProductList = async (page, pageSize, keyword) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
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

export const getProduct = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`
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

export const createProduct = async () => {
  try {
    const res = await fetch("https://sprint-mission-api.vercel.app/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "string",
        description: "string",
        price: 0,
        manufacturer: "string",
        tags: ["string"],
        images: ["string"],
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

export const patchProduct = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "string",
          description: "string",
          price: 0,
          manufacturer: "string",
          tags: ["string"],
          images: ["string"],
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

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`,
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
