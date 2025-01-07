import "./BestItems.css";

function BestItems() {
  const bestItems = [
    {
      id: 1,
      title: "아이패드 미니 핑크색",
      price: 500000,
      likes: 240,
      image: "https://example.com/ipad-mini-pink.jpg",
    },
    {
      id: 2,
      title: "세탁기 팝니다",
      price: 500000,
      likes: 240,
      image: "https://example.com/washer.jpg",
    },
    {
      id: 3,
      title: "오븐에서 갓 나온 쿠키",
      price: 500000,
      likes: 240,
      image: "https://example.com/cookies.jpg",
    },
    {
      id: 4,
      title: "맛있는 쿠키 구워 드려요",
      price: 500000,
      likes: 240,
      image: "https://example.com/more-cookies.jpg",
    },
  ];

  return (
    <section className="bestItems">
      <h2>베스트 상품</h2>
      <div className="itemGrid">
        {bestItems.map((item) => (
          <div key={item.id} className="itemCard">
            <img src={item.image} alt={item.title} />
            <div className="itemInfo">
              <h3>{item.title}</h3>
              <p>{item.price.toLocaleString()}원</p>
              <span>♥ {item.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BestItems;
