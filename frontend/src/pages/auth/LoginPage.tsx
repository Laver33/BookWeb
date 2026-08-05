import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import AuthIcon from "../../components/AuthImage";
import { toast } from "react-toastify";
import useAuthorStore from "@/store/authorStore";

const loginSchema = z.object({
  email: z.string().email({ message: "Некорректный email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { loginAuthor } = useAuthorStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await loginAuthor({
        email: data.email,
        password: data.password,
      });

      toast.success("Успешный вход");
      navigate("/home");
    } catch (e: any) {
      console.error(e);
      toast.error(e.response?.data?.message || "Ошибка входа");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-0 m-0 bg-gray-200 dark:bg-black">
      <motion.div
        className="flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Форма */}
        <div className="w-1/2 p-8">
          <form className="max-w-md mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-bold flex justify-center">Вход</h2>

            {/* Почта */}
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Пароль */}
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Пароль"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <motion.button
                whileHover={{ scaleY: 0.98, scaleX: 1.03 }}
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full bg-amber-700 font-medium hover:bg-amber-800 dark:bg-amber-800  dark:hover:bg-amber-900 text-white py-3 px-2 rounded disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Загрузка..." : "Войти"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full bg-white text-gray-900 font-medium p-2 rounded dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-400 hover:text-gray-800 duration-1000 disabled:opacity-50 transition-colors"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Нету аккаунта
              </motion.button>
            </div>
          </form>
        </div>

        {/* Изображение справа */}
        <AuthIcon />
      </motion.div>
    </div>
  );
};

export default LoginPage;
