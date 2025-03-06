import Link from "next/link";

export default function ItemNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-4xl font-bold mb-4">아이템을 찾을 수 없습니다</h1>
      <p className="text-gray-600 mb-8 text-center">
        요청하신 아이템이 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <div className="flex gap-4">
        <Link
          href="/items"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          아이템 목록으로
        </Link>
        <Link
          href="/"
          className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
