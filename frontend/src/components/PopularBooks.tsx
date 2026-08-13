import useBookStore from "@/store/bookStore";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { FaEye } from "react-icons/fa";
import BookButton from "./BookButton";

const PopularBooks = () => {
  const { books } = useBookStore();

  const topViewBooks = useMemo(() => {
    return [...books].sort((a, b) => b.views - a.views).slice(0, 3);
  }, [books]);

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -30 }}
      transition={{ duration: 1.4, delay: 0.3 }}
      className="bg-white/80 w-full backdrop-blur-sm  dark:bg-black rounded-lg shadow-xl p-4 sm:grid border border-amber-100"
    >
      <p className="text-center font-semibold text-lg">Популярные книги</p>
      <motion.div className="grid mt-2 gap-5 text-black py-2">
        {topViewBooks.map((item) => (
          <motion.div
            key={item.id}
            className="rounded-lg shadow-md py-2 shadow-gray-400 dark:shadow-gray-300 dark:ring px-4"
          >
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
  );
};

export default PopularBooks;
