import useBookStore from "@/store/bookStore";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const DeleteBookButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { deleteBook } = useBookStore();

  const handleDelete = () => {
    if (!id) return console.error("Не удалось удалить книгу");
    deleteBook(id).then(() => {
      toast.success("Книга успешно удалена");
      navigate("/books");
    });
  };
  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <motion.button
        onClick={handleDelete}
        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
        whileHover={{ scale: 1.05 }}
      >
        Удалить
      </motion.button>
    </div>
  );
};

export default DeleteBookButton;
