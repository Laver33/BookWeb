import { Link, useNavigate } from "react-router";

const Navigate = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex gap-6">
        <Link to="/home">Главная</Link>
        <Link to="/books">Книги</Link>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Выйти
        </button>
      </div>
    </nav>
  );
};

export default Navigate;
