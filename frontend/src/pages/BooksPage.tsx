import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useFetchAllData from "../hooks/dataFetch";
import useBookStore from "../store/bookStore.ts";
import DialogAddBook from "@/components/DialogAddBook.tsx";
import useAuthorStore from "@/store/authorStore.ts";
import NoAuthDialog from "@/components/NoAuthDialog.tsx";

const BooksPage = () => {
  useFetchAllData();
  const { token } = useAuthorStore();
  const { books } = useBookStore();
  const navigate = useNavigate();

  return (
    <div className="flex gap-12 px-16 pt-16">
      {/* Настройки */}
      <motion.section
        className="w-3/12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 gap-3 lg:flex sm:grid border border-amber-100">
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
              className="bg-white/80 dark:bg-black backdrop-blur-sm min-w-50 p-4 rounded-2xl shadow-xl border border-amber-100 dark:border-white hover:shadow-2xl transition-shadow duration-300"
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
              <button
                onClick={() => navigate(`/book/${item.id}`)}
                className="bg-amber-700 hover:bg-amber-800 dark:bg-amber-800 dark:hover:bg-amber-900 text-white px-4 py-1.5 rounded-lg mt-3 w-full shadow-md transition-colors duration-300"
              >
                Перейти
              </button>
            </motion.div>
          ))}
        </motion.section>
      )}
    </div>
  );
};

export default BooksPage;
