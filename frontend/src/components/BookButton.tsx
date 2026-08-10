import type { iBook } from "@/store/bookStore";
import { useNavigate } from "react-router";

const BookButton = (props: { item: iBook }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/book/${props.item.id}`)}
      className="bg-amber-700 hover:bg-amber-800 dark:bg-amber-800 dark:hover:bg-amber-900 text-white px-4 py-1.5 rounded-lg mt-3 w-full shadow-md transition-colors duration-300"
    >
      Перейти
    </button>
  );
};

export default BookButton;
