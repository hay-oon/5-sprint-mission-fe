import { notFound } from "next/navigation";

// 예시 아이템 데이터 (실제로는 API 호출 등으로 대체)
const items = [
  { id: "1", name: "아이템 1", description: "첫 번째 아이템입니다." },
  { id: "2", name: "아이템 2", description: "두 번째 아이템입니다." },
  { id: "3", name: "아이템 3", description: "세 번째 아이템입니다." },
];

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = items.find((item) => item.id === params.id);

  // 아이템이 존재하지 않으면 notFound() 호출
  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
      <p className="text-gray-700">{item.description}</p>
    </div>
  );
}
