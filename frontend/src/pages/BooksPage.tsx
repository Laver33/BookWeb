import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useFetchAllData from "../hooks/dataFetch";
import useBookStore from "../store/bookStore.ts";
import DialogAddBook from "@/components/DialogAddBook.tsx";
import useAuthorStore from "@/store/authorStore.ts";
import NoAuthDialog from "@/components/NoAuthDialog.tsx";
import { useMemo } from "react";
import BookButton from "@/components/BookButton.tsx";
import { FaEye } from "react-icons/fa";

const BooksPage = () => {
  useFetchAllData();
  const { token } = useAuthorStore();
  const { books } = useBookStore();
  const navigate = useNavigate();

  const topViewBooks = useMemo(() => {
    return [...books].sort((a, b) => b.views - a.views).slice(0, 3);
  }, [books]);

  return (
    <div className="flex gap-12 px-16 pt-16">
      {/* Настройки */}
      <motion.section
        className="w-3/12 flex flex-col items-center gap-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white/80 backdrop-blur-sm dark:bg-black rounded-2xl shadow-xl p-4 gap-3 lg:flex sm:grid border border-amber-100">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
          >
            {!token ? <NoAuthDialog /> : <DialogAddBook />}
          </motion.div>

          <motion.button
            onClick={() => navigate("/top")}
            whileHover={{ scale: 1.02 }}
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
          >
            Топ авторов
          </motion.button>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
          className="bg-white/80 w-full backdrop-blur-sm  dark:bg-black rounded-lg shadow-xl p-4 sm:grid border border-amber-100"
        >
          <p className="text-center font-semibold text-lg">Популярные книги</p>
          <motion.div className="grid mt-2 gap-5 text-black py-2">
            {topViewBooks.map((item) => (
              <motion.div className="rounded-lg shadow-md py-2 shadow-gray-400 dark:shadow-gray-300 dark:ring px-4">
                <p className="dark:text-white">{item.title}</p>
                <p className="break-all text-gray-600 dark:text-gray-400 ">
                  <span className="font-medium text-black dark:text-white">
                    Описание:{" "}
                  </span>
                  {item.description.slice(0, 50)}
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2 w-2/3 dark:text-white">
                    <FaEye />
                    <p>{item.views || 0}</p>
                  </div>
                  <BookButton item={item} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Список книг */}
      {books.length === 0 ? (
        <section className="justify-center flex items-center w-full h-[70vh]">
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            Книги не найдены
          </p>
        </section>
      ) : (
        <motion.section
          className="w-9/12 grid xl:grid-cols-4 lg:grid-cols-3 overflow-y max-h-200 lg:gap-4 md:grid-cols-2 md:gap-2 sm:grid-cols-1 sm:gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {books.map((item) => (
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
                {item.description.slice(0, 100)}
              </p>
              <p className="mt-2 font-medium text-amber-700">
                <span className="font-semibold text-black dark:text-white">
                  Цена:{" "}
                </span>
                {item.price}$
              </p>
              <BookButton item={item} />
            </motion.div>
          ))}
        </motion.section>
      )}
    </div>
  );
};

export default BooksPage;
