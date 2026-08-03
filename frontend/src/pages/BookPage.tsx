import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import useBookStore from "../store/bookStore";
import { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";

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
      text: "Понравилась книга",
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
          className="w-9/12 gap-5 grid text-xl"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 2.5 }}
        >
          <p>
            <span className="font-bold">Описание книги: </span>
            {currentBook.description}
          </p>

          <p>
            <span className="font-bold">Приблезительная цена книги: </span>
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

          <div className="flex gap-5  text-lg">
            <div className="flex items-center gap-2 text-gray-500">
              <FaEye />
              <p>null</p>
            </div>

            <div className="flex items-center gap-2 text-red-500">
              <FaRegHeart />
              <p>null</p>
            </div>
          </div>
        </motion.div>

        {/* Кнопки взаимодействие */}
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
              className="bg-amber-800 max-h-55 rounded-lg text-lg"
            >
              <p className="text-white font-medium">{item.text}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Список других книг */}
      <section className="p-12 grid gap-5">
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
                  <span className="text-black font-semibold">Описание: </span>
                  {item.description.slice(0, 100)}
                </p>
                <p className="mt-2 font-medium text-amber-700">
                  <span className="font-semibold text-black">Цена: </span>
                  {item.price}$
                </p>
                <button
                  onClick={() => navigate(`/book/${item.id}`)}
                  className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-1.5 rounded-lg mt-3 w-full shadow-md transition-colors duration-300"
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
