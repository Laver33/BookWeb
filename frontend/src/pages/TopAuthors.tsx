import useFetchAllData from "@/hooks/dataFetch";
import useAuthorStore from "@/store/authorStore";
import { FaCrown } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useEffect } from "react";

const TopAuthorsPage = () => {
  const { checkAuth } = useAuthorStore();
  useFetchAllData();

  useEffect(() => {
    checkAuth();
  }, []);
  const { authors } = useAuthorStore();
  let top = 1;

  return (
    <>
      <motion.header
        className="flex gap-10 py-36 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FaCrown className="text-5xl text-yellow-400" />
        <h1 className="font-medium text-6xl">Топ пользователей</h1>
        <FaCrown className="text-5xl text-yellow-400" />
      </motion.header>

      <section className="flex flex-1 w-full justify-center py-12 rounded-2xl">
        <motion.div
          className="items-center overflow-auto p-6 border flex flex-col gap-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl w-9/12 h-125 border-amber-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {authors.map((item) => (
            <motion.div
              key={item.id}
              className="text-gray-800 w-full flex items-center p-4 rounded-xl gap-5 bg-white shadow-md border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all duration-300 "
              whileHover={{ scale: 1.01 }}
            >
              <p className="flex gap-3 w-2/12">
                <span>{top++}</span> место
              </p>
              <p className="w-2/12 font-semibold text-amber-700">{item.name}</p>
              <p className="w-2/12 font-medium text-gray-700">{item.surname}</p>
              <p className="w-2/12 text-gray-600">{item.age} лет</p>
              <div className="w-6/12 flex justify-end">
                <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Автор
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default TopAuthorsPage;
