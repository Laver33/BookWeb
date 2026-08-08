import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import useBookStore from "../store/bookStore";
import { useEffect, useState } from "react";
import {
  FaEye,
  FaRegHeart,
  FaLongArrowAltUp,
  FaLongArrowAltDown,
} from "react-icons/fa";
import { toast } from "react-toastify";

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    books,
    currentBook,
    fetchBook,
    loading,
    putLikeBook,
    putRecommendBook,
    putUnrecommendBook,
  } = useBookStore();

  const [likes, setLikes] = useState(0);
  const [recommendations, setRecommendations] = useState(0);

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentBook) {
      setLikes(currentBook.likes || 0);
      setRecommendations(currentBook.recommendations || 0);
    }
  }, [currentBook]);

  const handleLike = () => {
    if (!id) return;
    setLikes(likes + 1);

    putLikeBook(id).catch(() => {
      setLikes(likes);
      toast.error("Ошибка лайка");
    });
  };

  const handleRecommend = () => {
    if (!id) return;
    setRecommendations(recommendations + 1);

    toast("👍 Вы рекомендуете эту книгу");
    putRecommendBook(id).catch(() => {
      setRecommendations(recommendations);
      toast.error("Ошибка рекомендации");
    });
  };

  const handleUnrecommend = () => {
    if (!id) return;
    setRecommendations(recommendations - 1);

    toast("👎 Вы не рекомендуете эту книгу");
    putUnrecommendBook(id).catch(() => {
      setRecommendations(recommendations);
      toast.error("Ошибка рекомендации");
    });
  };

  const buttonsData = [
    {
      id: 1,
      text: "Добавить в избранное",
      click: () => toast.error("Пока пусто"),
    },
    {
      id: 2,
      text: "Понравилась книга",
      click: handleLike,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!currentBook) {
    return <div>Book not found</div>;
  }

  const date = new Date(currentBook.createdAt);

  return (
    <section className="grid">
      <div className="flex justify-center bg-gray-100 dark:bg-gray-900 inset-shadow-sm py-28">
        <motion.h2
          className="text-7xl font-bold"
          whileInView={{ scale: 1.5 }}
          transition={{ duration: 0.5 }}
        >
          {currentBook.title}
        </motion.h2>
      </div>

      <div className="flex p-12">
        <motion.div
          className="w-9/12 gap-5 grid text-xl"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 2.5 }}
        >
          <p>
            <span className="font-bold">Описание книги: </span>
            {currentBook.description}
          </p>

          <p>
            <span className="font-bold">Приблизительная цена книги: </span>
            {currentBook.price}$
          </p>

          <p>
            <span className="font-bold">Дата добавления:</span>{" "}
            {date.toLocaleDateString()}
          </p>

          <p>
            <span className="font-bold">Автор поста: </span>
            {currentBook.author
              ? `${currentBook.author.name} ${currentBook.author.surname}`
              : "Аноним"}
          </p>

          <div className="flex gap-5 text-lg">
            <div className="flex items-center gap-2 text-gray-500">
              <FaEye />
              <p>{currentBook.views || 0}</p>
            </div>

            <div className="flex items-center gap-2 text-red-500">
              <FaRegHeart />
              <p>{likes}</p>
            </div>

            <div className="flex items-center gap-2 rounded-sm text-lg border p-1">
              <FaLongArrowAltUp
                onClick={handleRecommend}
                className="text-green-500"
              />
              {recommendations < 0 ? (
                <p className="text-red-400">{recommendations}</p>
              ) : (
                <p className="text-green-400">{recommendations}</p>
              )}
              <FaLongArrowAltDown
                onClick={handleUnrecommend}
                className="text-red-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-3/12 gap-3 grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {buttonsData.map((item) => (
            <motion.button
              whileHover={{ scale: 1.02 }}
              key={item.id}
              onClick={item.click}
              className="bg-amber-800 max-h-55 rounded-lg text-lg py-3 px-4"
            >
              <p className="text-white font-medium">{item.text}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <section className="p-12 grid gap-5">
        <h2 className="text-xl font-bold">Список других книг</h2>

        <div className="flex gap-5 py-4 overflow-y-auto shrink-0">
          {books
            .filter((book) => book.id !== currentBook.id)
            .map((item) => (
              <motion.div
                key={item.id}
                className="bg-white/80 dark:bg-black dark:border-white backdrop-blur-sm min-w-50 p-4 rounded-2xl shadow-xl border border-amber-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <p className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </p>
                <p className="text-gray-700 dark:text-gray-100">
                  <span className="text-black font-semibold dark:text-white">
                    Описание:{" "}
                  </span>
                  {item.description.slice(0, 100)}
                </p>
                <p className="mt-2 font-medium text-amber-700 dark:text-white">
                  <span className="font-semibold text-black dark:text-white">
                    Цена:{" "}
                  </span>
                  {item.price}$
                </p>
                <button
                  onClick={() => navigate(`/book/${item.id}`)}
                  className="bg-amber-700 hover:bg-amber-800 dark:bg-amber-800 dark:hover:bg-amber-900 text-white px-4 py-1.5 rounded-lg mt-3 w-full shadow-md transition-colors duration-300"
                >
                  Перейти
                </button>
              </motion.div>
            ))}
        </div>
      </section>
    </section>
  );
};

export default BookPage;
