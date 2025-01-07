import "./OnSaleItems.css";

function OnSaleItems() {
  const items = [
    {
      id: 1,
      title: "화장품 팔레트",
      price: 1500000,
      likes: 240,
      image: "https://example.com/palette.jpg",
    },
    {
      id: 2,
      title: "로봇청소기",
      price: 1500000,
      likes: 240,
      image: "https://example.com/robot.jpg",
    },
    {
      id: 3,
      title: "무선이어폰",
      price: 250000,
      likes: 185,
      image: "https://example.com/earbuds.jpg",
    },
    {
      id: 4,
      title: "스마트워치",
      price: 350000,
      likes: 156,
      image: "https://example.com/smartwatch.jpg",
    },
    {
      id: 5,
      title: "노트북",
      price: 2100000,
      likes: 423,
      image: "https://example.com/laptop.jpg",
    },
    {
      id: 6,
      title: "커피머신",
      price: 680000,
      likes: 198,
      image: "https://example.com/coffee.jpg",
    },
    {
      id: 7,
      title: "게이밍 마우스",
      price: 89000,
      likes: 267,
      image: "https://example.com/mouse.jpg",
    },
    {
      id: 8,
      title: "블루투스 스피커",
      price: 125000,
      likes: 142,
      image: "https://example.com/speaker.jpg",
    },
    {
      id: 9,
      title: "태블릿PC",
      price: 890000,
      likes: 334,
      image: "https://example.com/tablet.jpg",
    },
    {
      id: 10,
      title: "전기자전거",
      price: 1200000,
      likes: 178,
      image: "https://example.com/bike.jpg",
    },
    {
      id: 11,
      title: "캠핑 텐트",
      price: 320000,
      likes: 225,
      image: "https://example.com/tent.jpg",
    },
    {
      id: 12,
      title: "공기청정기",
      price: 450000,
      likes: 291,
      image: "https://example.com/airpurifier.jpg",
    },
  ];

  return (
    <section className="onSaleItems">
      <div className="sectionHeader">
        <h2>판매중인 상품</h2>
        <div className="searchBox">
          <input type="text" placeholder="검색어를 입력해주세요" />
          <button>상품 등록하기</button>
        </div>
      </div>
      <div className="itemGrid">
        {items.map((item) => (
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

export default OnSaleItems;
