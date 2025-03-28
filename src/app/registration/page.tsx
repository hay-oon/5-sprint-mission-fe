import ProductRegistrationForm from "@/components/items/ProductRegistrationForm";

export default function ProductRegistrationPage() {
  return (
    <main className="min-h-screen">
      <ProductRegistrationForm />
    </main>
  );
}

export const metadata = {
  title: "상품 등록 - 마켓",
  description: "새로운 상품을 등록하세요.",
};
