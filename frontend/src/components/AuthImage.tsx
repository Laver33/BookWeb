import { motion } from "framer-motion";
import AuthIcon from "../assets/AuthImage.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const AuthImage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="w-1/2 h-full flex flex-col items-end"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.button
        onClick={() => navigate("/home")}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mr-6 py-2 px-4 border cursor-pointer mt-3 border-black rounded-sm flex justify-center items-center gap-3"
      >
        <FaArrowLeft />
        <p>Войти как гость</p>
      </motion.button>
      <img
        src={AuthIcon}
        alt="Изображение для авторизации и регистрации"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default AuthImage;
