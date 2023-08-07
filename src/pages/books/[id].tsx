import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

const BookPage = () => {
  const router = useRouter();
  const { data: book } = api.book.getOne.useQuery({
    id: router.query.id as string,
  });
  const favorite = api.favorite.toggle.useMutation({
    onSuccess: () => {
      utils.user.getOneByName.invalidate({ name: user.data?.name });
    },
  });
  const session = useSession();
  const user = api.user.getOneByName.useQuery({
    name: session.data?.user?.name || "",
  });
  const isFavorite = useMemo(() => {
    return user.data?.favorites.find((f) => f.book.id === book?.id);
  }, [user, favorite]);
  const utils = api.useContext();

  return (
    <div className="text-white">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Book</span>
      </h1>
      <p>Name: {book?.name}</p>
      <p>Author: {book?.author}</p>
      <button
        className="rounded-lg bg-gray-500 p-2"
        onClick={() => {
          favorite.mutate({
            userId: user.data?.id || "1",
            bookId: book?.id || "1",
            assignedAt: new Date(),
          });
        }}
      >
        Favorite <span>{isFavorite ? "❤️" : "🤍"}</span>
      </button>
    </div>
  );
};

export default BookPage;
