import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>판다마켓</title>
        <meta name="description" content="중고거래의 모든 것, 판다마켓" />
        <link rel="icon" href="/images/logo/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen bg-[var(--background)]">
        <Header />
        <main className="flex-1 pt-[var(--header-height)]">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
