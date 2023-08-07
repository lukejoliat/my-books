import { api } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const { data: user } = api.user.getOne.useQuery({
    id: router.query.id as string,
  });

  return (
    <>
      <Head>
        <title>{user?.name}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-white">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">User</span>
        </h1>
        <p>Name: {user?.name}</p>
        <p>Age: {user?.age}</p>
        <p>
          Favorites:
          {user?.favorites.map((f) => (
            <div>{f.book.name}</div>
          ))}
        </p>
      </div>
    </>
  );
};

export default ProfilePage;