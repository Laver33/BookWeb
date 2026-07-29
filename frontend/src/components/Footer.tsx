import { motion } from "framer-motion";
import { Link } from "react-router";

const Footer = () => {
  return (
    <section className="px-4 py-12 bg-amber-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          Готов погрузиться в мир книг?
        </h2>
        <p className="mt-4 text-xl text-amber-100">
          Присоединяйся к сообществу читателей и делись своими открытиями
        </p>
        <Link
          to="/books"
          className="inline-block px-10 py-4 mt-8 text-lg font-semibold text-amber-800 transition-all duration-500 bg-white rounded-lg shadow-lg hover:bg-amber-50 hover:shadow-2xl hover:scale-105"
        >
          Начать сейчас
        </Link>
      </motion.div>
    </section>
  );
};

export default Footer;
