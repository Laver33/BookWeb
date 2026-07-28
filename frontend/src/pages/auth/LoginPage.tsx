import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import AuthIcon from "../../assets/AuthImage.jpg";

const loginSchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не менее 2 символов" }),
  email: z.string().email({ message: "Некорректный email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    try {
      navigate("/home");
      console.log(data);
    } catch (e) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-0 m-0 bg-gray-200">
      <div className="flex items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Форма */}
        <div className="w-1/2 p-8">
          <form className="max-w-md mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-bold flex justify-center">Вход</h2>

            {/* Имя */}
            <div>
              <input
                {...register("name")}
                placeholder="Имя"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                whileHover={{ scale: 1.02 }}
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Загрузка..." : "Войти"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full bg-white text-blue-500 p-2 rounded  hover:text-blue-600 duration-1000 disabled:opacity-50 transition-colors"
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
        <div className="w-1/2 h-full text-cyan-200">
          <img
            src={AuthIcon}
            alt="Изображение для авторизации и регистрации"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
