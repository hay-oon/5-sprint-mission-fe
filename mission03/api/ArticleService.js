// [ ] getArticleList() : GET 메서드를 사용해 주세요.
// [ ] page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
// [ ] getArticle() : GET 메서드를 사용해 주세요.
// [ ] createArticle() : POST 메서드를 사용해 주세요.
// [ ] request body에 title, content, image 를 포함해 주세요.
// [ ] patchArticle() : PATCH 메서드를 사용해 주세요.
// [ ] deleteArticle() : DELETE 메서드를 사용해 주세요.
// [ ]  fetch 혹은 axios 를 이용해 주세요.

// [ ] 응답의 상태 코드가 2XX가 아닐 경우, 에러메시지를 콘솔에 출력해 주세요.
// [ ]  .then() 메서드를 이용하여 비동기 처리를 해주세요.

// [ ]  .catch() 를 이용하여 오류 처리를 해주세요.

export const getArticleList = async = () {
    const res = await fetch("https://sprint-mission-api.vercel.app/articles")
    const data = await res.json()
    console.log(data)
}

getArticleList()