import "@/styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "중고거래의 모든 것, 판다마켓",
  icons: {
    icon: "/images/logo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen bg-[var(--background)]">
            <Header />
            <main className="flex-1 pt-[var(--header-height)]">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
