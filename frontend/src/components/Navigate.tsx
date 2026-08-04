import { Link } from "react-router";
import { IoPlanetOutline } from "react-icons/io5";
import { IoMdPlanet } from "react-icons/io";
import { useState } from "react";
import useAuthorStore from "@/store/authorStore";

const ThemeVariants = {
  Light: "light",
  Dark: "dark",
} as const;

type ThemeType = (typeof ThemeVariants)[keyof typeof ThemeVariants];

const Navigate = () => {
  const { token, logout } = useAuthorStore();
  const [theme, setTheme] = useState<ThemeType>(ThemeVariants.Light);

  const toggleTheme = () => {
    setTheme(
      theme === ThemeVariants.Light ? ThemeVariants.Dark : ThemeVariants.Light,
    );
  };

  const NAVIGATE = [
    {
      name: "Главная",
      path: "/home",
    },
    {
      name: "Книги",
      path: "/books",
    },
  ];

  return (
    <nav className="bg-gray-900 text-white py-1.5 grid lg:grid-cols-4 sm:grid-cols-2 gap-1 w-3/10 mx-auto lg:my-5 sm:my-1 place-items-center rounded-3xl">
      <div
        onClick={toggleTheme}
        className="cursor-pointer bg-gray-800 py-1.5 px-3 rounded-2xl"
      >
        {theme === ThemeVariants.Light ? (
          <IoPlanetOutline className="text-2xl" />
        ) : (
          <IoMdPlanet className="text-2xl" />
        )}
      </div>

      {NAVIGATE.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="hover:bg-gray-200 hover:text-black duration-700 transition-colors px-5 py-1.5 rounded-3xl"
        >
          {item.name}
        </Link>
      ))}

      {!token ? (
        <Link
          to="/"
          className="hover:bg-gray-200 hover:text-black duration-700 transition-colors px-5 py-1.5 rounded-3xl"
        >
          Войти
        </Link>
      ) : (
        <Link
          onClick={logout}
          to="/"
          className="hover:bg-gray-200 hover:text-black duration-700 transition-colors px-5 py-1.5 rounded-3xl"
        >
          Выйти
        </Link>
      )}
    </nav>
  );
};

export default Navigate;
