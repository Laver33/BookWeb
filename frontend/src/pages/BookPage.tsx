import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import useBookStore from "../store/bookStore";
import { useEffect } from "react";

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { books, currentBook, fetchBook, loading } = useBookStore();

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const buttonsData = [
    {
      id: 1,
      text: "Добавить в избранное",
    },
    {
      id: 2,
      text: "Лайк",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!currentBook) {
    return <div>Book not found</div>;
  }

  // Для даты добавления
  const date = new Date(currentBook.createdAt);

  return (
    <section className="grid">
      <div className="flex justify-center bg-gray-100 inset-shadow-sm py-28">
        <motion.h2
          className="text-7xl font-bold"
          whileInView={{ scale: 1.5 }}
          transition={{ duration: 0.5 }}
        >
          {currentBook.title}
        </motion.h2>
      </div>

      <div className="flex p-12">
        {/* Описание и инофрмация */}
        <motion.div
          className="w-8/12 gap-5 grid text-xl"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 2.5 }}
        >
          <p>
            <span className="font-bold">Описание книги: </span>
            {currentBook.description}
          </p>

          <p>
            <span className="font-bold">Дата добавления:</span>{" "}
            {date.toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Приблезительная цена книги: </span>
            {currentBook.price}$
          </p>
        </motion.div>

        {/* Кнопки взаимодействие */}
        <motion.div
          className="w-4/12 gap-4 grid justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {buttonsData.map((item) => (
            <motion.button
              key={item.id}
              className="bg-amber-800 px-7 rounded-lg text-lg"
            >
              <p className="text-white font-medium">{item.text}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Список других книг */}
      <div className="p-12 grid gap-5">
        <h2 className="text-xl font-bold">Список других книг</h2>

        {/* Список книг */}
        <div className="flex gap-5 py-4 overflow-y-auto shrink-0">
          {books
            .filter((book) => book.id !== currentBook.id)
            .map((item) => (
              <motion.div
                key={item.id}
                className="bg-white/80 backdrop-blur-sm min-w-50 p-4 rounded-2xl shadow-xl border border-amber-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <p className="mb-2 font-semibold text-gray-900">{item.title}</p>
                <p className="text-gray-700">
                  Опис: {item.description.slice(0, 100)}
                </p>
                <p className="mt-2 font-medium text-amber-700">{item.price}$</p>
                <button
                  onClick={() => navigate(`/book/${item.id}`)}
                  className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-1.5 rounded-lg mt-3 w-full shadow-md transition-colors duration-300"
                >
                  Перейти
                </button>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BookPage;
