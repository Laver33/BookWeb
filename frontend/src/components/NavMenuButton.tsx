import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router";

const NavMenuButton = () => {
  const navigate = useNavigate();

  const menuData = [
    { id: 1, name: "Книги", action: () => navigate("/books") },
    { id: 2, name: "Топ авторов", action: () => navigate("/top") },
  ];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="hover:bg-gray-200 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white duration-700 transition-colors px-5 py-1.5 rounded-3xl bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-gray-800">
        Меню
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-gray-900 dark:bg-gray-100 text-gray-400  rounded-xl shadow-lg   p-2">
        {menuData.map((item) => (
          <NavigationMenuLink
            key={item.id}
            onClick={item.action}
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {item.name}
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavMenuButton;
