import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import useAuthorStore from "@/store/authorStore";
import { useNavigate } from "react-router";

const NavProfileButton = () => {
  const { logout } = useAuthorStore();
  const navigate = useNavigate();

  const menuData = [
    {
      id: 1,
      name: "Выйти",
      action: () => {
        logout();
        navigate("/");
      },
    },
    { id: 2, name: "Мой профиль", action: () => navigate("/me") },
  ];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="hover:bg-gray-200 duration-700 hover:text-black px-4 py-1.5 rounded-3xl bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-gray-800">
        Профиль
      </NavigationMenuTrigger>
      <NavigationMenuContent className="rounded-xl text-gray-400 shadow-lg p-2">
        {menuData.map((item) => (
          <NavigationMenuLink
            key={item.id}
            onClick={item.action}
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {item.name}
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavProfileButton;
