import { motion } from "framer-motion";
import { Link } from "react-router";
import useFetchAllData from "../hooks/dataFetch";
import useAuthorStore from "../store/authorStore";
import useBookStore from "../store/bookStore";

const HomePage = () => {
  useFetchAllData();

  const { authors } = useAuthorStore();
  const { books } = useBookStore();

  const projectStats = [
    {
      id: 1,
      title: "Пользователей на проекте",
      value: authors.length,
    },
    {
      id: 2,
      title: "Книг на сайте",
      value: books.length,
    },
  ];

  const DevInfo = [
    {
      id: 1,
      title: "Имя",
      value: "Павел",
    },
    {
      id: 2,
      title: "Стек",
      value: "ReactTS, NodeJS (ExpressJS), PostgreSQL, Prisma ORM.",
    },
    {
      id: 3,
      title: "Telegram",
      value: "@TrueReady",
    },
    {
      id: 4,
      title: "Почта",
      value: "pad666444@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-24 mx-auto max-w-7xl sm:pt-24 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            <span className="block">Добро пожаловать в</span>
            <span className="block mt-2 text-amber-700">Книжного Червяка</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600">
            Открывай мир книг через отзывы читателей и их рекомендации. Находи
            свои следующие любимые произведения вместе с нами и наслаждайтесь.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row"
          >
            <Link
              to="/books"
              className="px-6 py-4 text-lg max-w-48 font-semibold text-white duration-500 transition-all bg-amber-700 rounded-lg shadow-lg hover:bg-amber-800 hover:shadow-xl hover:scale-105"
            >
              Начать читать
            </Link>
            <Link
              to="/top"
              className="px-6 py-4 text-lg max-w-48 font-semibold text-white duration-500 transition-all bg-amber-700 rounded-lg shadow-lg hover:bg-amber-800 hover:shadow-xl hover:scale-105"
            >
              Топ авторов
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Информация о разработчике и проекте */}
      <section className="px-4 pb-24">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Левая колонка - О разработчике */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100 hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center text-2xl">
                👨‍💻
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                О разработчике
              </h2>
            </div>

            <div className="space-y-4">
              {DevInfo.map((item) => (
                <motion.div
                  key={item.id}
                  className="p-4 bg-amber-50 rounded-xl border border-amber-200 hover:border-amber-400 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">
                    {item.title}
                  </span>
                  <p className="mt-1 text-lg text-gray-800 font-medium">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Правая колонка - О проекте */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100 hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center text-2xl">
                📖
              </div>
              <h2 className="text-3xl font-bold text-gray-900">О проекте</h2>
            </div>

            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Идея проекта — создать сообщество, где люди сами добавляют
                интересные книги и тем самым помогают другим с выбором. Проект
                создан для читателей любого возраста.
              </p>
            </div>

            {/* Статистика */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Краткая статистика
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {projectStats.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-5 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 text-center"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-3xl font-bold text-amber-700">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 font-medium">
                      {item.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
