import useAuthorStore from "@/store/authorStore";
import { useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const CurrentAuthorPage = () => {
  const { currentAuthor, getMe } = useAuthorStore();

  useEffect(() => {
    getMe();
  }, []);

  const totalLikes =
    currentAuthor?.books?.reduce((sum, book) => sum + (book.likes || 0), 0) ||
    0;

  const totalViews =
    currentAuthor?.books?.reduce((sum, book) => sum + (book.views || 0), 0) ||
    0;

  const totalRecommendations =
    currentAuthor?.books?.reduce(
      (sum, book) => sum + (book.recommendations || 0),
      0,
    ) || 0;

  const buttonsData = [
    { id: 1, name: "Редактировать", action: () => toast.info("Редактировать") },
    { id: 2, name: "Выйти", action: () => toast.info("Выйти") },
  ];

  if (!currentAuthor) return <p>Автор не найден</p>;
  return (
    <section className="flex flex-col  items-center justify-center py-14">
      <header className="w-8/12 flex max-h-50 border mt-12 p-3 rounded-lg shadow-xl">
        {/* Аватарка */}
        <div className="w-1/5 flex justify-center items-center text-9xl">
          <FaRegUser className="p-3 shadow-xl rounded-lg" />
        </div>

        {/* Основные данные */}
        <div className="w-2/5 text-sm font-medium text-gray-600 flex justify-center flex-col gap-2">
          <p>
            <span className="text-black">Имя:</span> {currentAuthor?.name}
          </p>
          <p>
            <span className="text-black">Фамилия:</span>{" "}
            {currentAuthor?.surname}
          </p>
          <p>
            <span className="text-black">Email:</span> {currentAuthor?.email}
          </p>
        </div>

        {/* Доп статистика */}
        <div className="w-2/5 flex justify-center flex-col gap-2 text-sm font-medium text-gray-600">
          <p>
            <span className="text-black">Лайков:</span> {totalLikes}
          </p>
          <p>
            <span className="text-black">Просмотров:</span> {totalViews}
          </p>
          <p>
            <span className="text-black">Рекомендаций:</span>{" "}
            {totalRecommendations}
          </p>
        </div>
      </header>

      <div className="flex my-4 w-8/12 justify-center gap-3 max-h-50">
        <div className="border rounded-lg shadow-2xl w-5/8 h-full justify-center p-5">
          <header className="font-semibold mb-2">Описание профиля</header>
          {currentAuthor?.description ? (
            <p className="text-gray-700 dark:text-gray-300">
              {currentAuthor.description}
            </p>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 italic">
              Описание отсутствует
            </p>
          )}
        </div>

        <div className="grid border px-5 py-3 gap-3 rounded-lg shadow-2xl w-3/8">
          {buttonsData.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              onClick={item.action}
              className="text-white w-full py-3 rounded-lg hover:bg-amber-800 duration-500 bg-amber-700"
            >
              {item.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Книги автора */}
      <p className="w-8/12 my-3 text-black font-semibold">Опубликовал:</p>
      <div className="w-8/12 grid xl:grid-cols-4 lg:grid-cols-3 overflow-y max-h-200 lg:gap-4 md:grid-cols-2 md:gap-2 sm:grid-cols-1 sm:gap-2">
        {currentAuthor.books.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white/80 dark:bg-black backdrop-blur-sm min-w-50 p-4 rounded-lg shadow-xl border border-amber-100 dark:border-white hover:shadow-2xl transition-shadow duration-300"
          >
            <p className="mb-2 font-semibold text-gray-900 dark:text-white">
              {item.title}
            </p>
            <p className="text-gray-700 dark:text-gray-100 break-all">
              <span className="text-black font-semibold dark:text-white">
                Описание:{" "}
              </span>
              {item.description}
            </p>
            <p className="mt-2 font-medium text-amber-700">
              <span className="font-semibold text-black dark:text-white">
                Цена:{" "}
              </span>
              {item.price}$
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CurrentAuthorPage;
