import { useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const session = useSession();
  return (
    <header className="container m-auto text-white">
      <nav className="flex w-full items-center p-4">
        <Link href={"/"} className="mx-2">
          Books App
        </Link>
        {session.status !== "authenticated" ? (
          <button className="mx-4 rounded-lg bg-blue-600 p-2">
            <Link href="/api/auth/signin?callback=http://localhost:3000">
              Sign In
            </Link>
          </button>
        ) : (
          <>
            <Link className="mx-2" href="/profile">
              Profile
            </Link>
            <button className="mx-2 rounded-lg bg-blue-600 p-2">
              <Link href="/api/auth/signout?callback=http://localhost:3000">
                Sign Out
              </Link>
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
