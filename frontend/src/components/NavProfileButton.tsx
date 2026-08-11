import {
  NavigationMenuContent,
  NavigationMenuItem,
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
      <NavigationMenuTrigger className="...">Профиль</NavigationMenuTrigger>
      <NavigationMenuContent className="...">
        {menuData.map((item) => (
          <div
            key={item.id}
            onClick={item.action}
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {item.name}
          </div>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavProfileButton;
