import { motion } from "framer-motion";
import AuthIcon from "../assets/AuthImage.jpg";

const AuthImage = () => {
  return (
    <motion.div
      className="w-1/2 h-full text-cyan-200"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <img
        src={AuthIcon}
        alt="Изображение для авторизации и регистрации"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default AuthImage;
