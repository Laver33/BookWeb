// Navigate.tsx
import { Link } from "react-router";
import { IoPlanetOutline } from "react-icons/io5";
import { IoMdPlanet } from "react-icons/io";
import useAuthorStore from "@/store/authorStore";
import NavMenuButton from "./NavMenuButton";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type ThemeType = "light" | "dark";

const Navigate = (props: { theme: ThemeType; toggleTheme: () => void }) => {
  const { token, logout } = useAuthorStore();

  const NAVIGATE = [
    {
      name: "Главная",
      path: "/home",
    },
  ];

  return (
    <nav className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black py-1.5 grid lg:grid-cols-4 sm:grid-cols-2 gap-1 w-3/10 mx-auto lg:my-5 sm:my-1 place-items-center rounded-3xl">
          <div
            onClick={props.toggleTheme}
            className="cursor-pointer bg-gray-800 dark:bg-gray-300 py-1.5 px-3 rounded-2xl"
          >
            {props.theme === "light" ? (
              <IoPlanetOutline className="text-2xl" />
            ) : (
              <IoMdPlanet className="text-2xl" />
            )}
          </div>

          {NAVIGATE.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:bg-gray-200 hover:text-black dark:hover:text-white dark:hover:bg-gray-800  duration-700 transition-colors px-5 py-1.5 rounded-3xl"
            >
              {item.name}
            </Link>
          ))}

          <NavMenuButton />

          {!token ? (
            <Link
              to="/"
              className="hover:bg-gray-200 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white duration-700 transition-colors px-5 py-1.5 rounded-3xl"
            >
              Войти
            </Link>
          ) : (
            <Link
              onClick={logout}
              to="/"
              className="hover:bg-gray-200 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white duration-700 transition-colors px-5 py-1.5 rounded-3xl"
            >
              Выйти
            </Link>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navigate;
