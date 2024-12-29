import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

const articles = await getArticleList();
console.log("getArticleList:", articles);

const article = await getArticle(238);
console.log("getArticle:", article);

const newArticle = await createArticle(
  "에어팟 오른쪽 한짝만 삽니다",
  "에어팟 오른쪽만 한짝 A급으로 구해봅니다",
  "image.jpg"
);
console.log("createArticle:", newArticle);

const updatedArticle = await patchArticle(newArticle.id, {
  title: "[**급구**] 에어팟 오른쪽 한짝만 삽니다",
  content: "평일 역삼역 직거래 가능",
});
console.log("patchArticle:", updatedArticle);

const deletedArticle = await deleteArticle(149);
console.log("deleteArticle:", deletedArticle);

const products = await getProductList();
console.log("getProductList:", products);

const product = await getProduct(129);
console.log("getProduct:", product);

const postData = {
  name: "전 남친이 사준 카카오 라이언 인형",
  description: "꼴보기 싫어서 팝니다. 쿨거래시 택포",
  price: 10000,
  manufacturer: "카카오",
  tags: ["test"],
  images: ["test.jpg"],
};
const newProduct = await createProduct(postData);
console.log("createProduct:", newProduct);

const updatedProduct = await patchProduct(newProduct.id, {
  name: "[가격 인하] 전 남친 라이언 인형",
  price: 5000,
});
console.log("patchProduct:", updatedProduct);

const deletedProduct = await deleteProduct(166);
console.log("deleteProduct:", deletedProduct);
