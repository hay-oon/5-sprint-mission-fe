const updatedProduct = await patchProduct(newProduct.id, {
  name: "[가격 인하] 전 남친 라이언 인형",
  price: 5000,
});
console.log("patchProduct:", updatedProduct);

const deletedProduct = await deleteProduct(166);
console.log("deleteProduct:", deletedProduct);
