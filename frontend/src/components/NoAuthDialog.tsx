import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router";

const NoAuthDialog = () => {
  const navigate = useNavigate();
  return (
    <Tooltip>
      <TooltipTrigger
        className="cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
        onClick={() => navigate("/")}
      >
        Добавить книгу
      </TooltipTrigger>
      <TooltipContent>
        <p>Авторизуйтесь для добавления книги</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default NoAuthDialog;
