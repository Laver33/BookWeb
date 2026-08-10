import useFetchAllData from "@/hooks/dataFetch";
import useAuthorStore from "@/store/authorStore";
import { FaCrown } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const TopAuthorsPage = () => {
  const { checkAuth } = useAuthorStore();
  useFetchAllData();

  useEffect(() => {
    checkAuth();
  }, []);
  const { authors } = useAuthorStore();
  let top = 1;

  const statTitles: string[] = [
    "Место",
    "Имя",
    "Фамилия",
    "Возраст",
    "Книг",
    "Лайков",
    "Поднятий",
    "Просмотров",
    "Статус",
  ];

  const websiteStats = useMemo(
    () => [
      { id: 1, title: "Количество авторов", value: authors.length },
      {
        id: 2,
        title: "Количество книг",
        value: authors.reduce((acc, curr) => acc + curr.books.length, 0),
      },
      {
        id: 3,
        title: "Количество лайков",
        value: authors.reduce((acc, curr) => acc + curr.totalLikes, 0),
      },
      {
        id: 4,
        title: "Количество поднятий",
        value: authors.reduce(
          (acc, curr) => acc + curr.totalRecommendations,
          0,
        ),
      },
      {
        id: 5,
        title: "Количество просмотров",
        value: authors.reduce((acc, curr) => acc + curr.totalViews, 0),
      },
    ],
    [authors],
  );

  return (
    <>
      <motion.header
        className="flex gap-10 py-36 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FaCrown className="text-5xl text-yellow-400" />
        <h1 className="font-semibold text-6xl">Топ пользователей</h1>
        <FaCrown className="text-5xl text-yellow-400" />
      </motion.header>

      <section className="flex flex-col w-full  items-center py-12 rounded-2xl">
        {/* Наименование статистики */}
        <motion.div className="items-center p-6 border flex gap-4 bg-white/80 dark:bg-black backdrop-blur-sm rounded-lg mb-4 shadow-sm w-9/12 h-12 border-amber-100">
          {statTitles.map((item) => (
            <motion.div className="w-2/12 flex justify-center">
              {item}
            </motion.div>
          ))}
        </motion.div>

        {/* Сама статистика */}
        <motion.div
          className="items-center overflow-auto p-6 border dark:bg-black flex flex-col gap-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl w-9/12 h-125 border-amber-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {authors.map((item) => (
            <motion.div
              key={item.id}
              className="text-gray-800 w-full text-sm flex items-center p-4 rounded-xl gap-5 bg-white shadow-md border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all duration-300 "
              whileHover={{ scale: 1.01 }}
            >
              <p className="flex gap-3 w-2/12">
                <span>{top++}</span> место
              </p>
              <p className="w-2/12 font-semibold text-amber-700">{item.name}</p>
              <p className="w-2/12 font-medium text-gray-700">{item.surname}</p>
              <p className="w-2/12 text-gray-600">{item.age} лет</p>
              <p className="w-2/12 text-gray-600">{item.books.length} книг</p>
              <p className="w-2/12 text-gray-600">{item.totalLikes} Лайков</p>
              <p className="w-2/12 text-gray-600">
                {item.totalRecommendations} Поднятий
              </p>
              <p className="w-2/12 text-gray-600">
                {item.totalViews} Просмотры
              </p>
              <div className="flex justify-end">
                <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Автор
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section>
        <motion.h2
          className="font-bold lg:text-6xl sm:text-4xl  flex items-center justify-center lg:h-100 sm:h-70"
          whileInView={{ scale: 1 }}
          initial={{ scale: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          Хотите увидеть статистику сайта?
        </motion.h2>
      </section>

      <motion.section
        className="flex justify-center w-full mb-12"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 1.2 }}
      >
        <div className="grid grid-cols-3 gap-5 w-9/12">
          {websiteStats.map((item) => (
            <motion.div
              key={item.id}
              className="border cursor-default px-4 py-3 rounded-lg h-30 hover:shadow-xl hover:border-amber-300 dark:border-amber-900 transition-all duration-300 flex flex-col justify-center items-center"
              whileHover={{ scale: 1.01 }}
            >
              <p className="text-lg font-semibold text-amber-700 text-center">
                {item.title}
              </p>
              <p className="text-2xl text-gray-600 text-center dark:text-gray-300">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default TopAuthorsPage;
