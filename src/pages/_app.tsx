import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Header } from "@/components/header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Header />
        <main className="min-h-screen p-4">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
