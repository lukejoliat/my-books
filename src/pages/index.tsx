import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const session = useSession();

  const { data: books } = api.book.getAll.useQuery();
  const { data: users } = api.user.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Books App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {session.status === "authenticated" ? (
          <>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              <span className="text-[hsl(280,100%,70%)]">Books</span>
            </h1>
            <div className="text-2xl text-white">
              {books
                ? books.map((b) => (
                    <p key={b.id}>
                      <Link href={`/books/${b.id}`}>{b.name}</Link>
                    </p>
                  ))
                : "Loading..."}
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              <span className="text-[hsl(280,100%,70%)]">Users</span>
            </h1>
            <div className="text-2xl text-white">
              {users
                ? users.map((b) => (
                    <p key={b.id}>
                      <Link href={`/users/${b.id}`}>{b.name}</Link>
                    </p>
                  ))
                : "Loading..."}
            </div>
          </>
        ) : (
          <div>not authenticated</div>
        )}
      </>
    </>
  );
}
