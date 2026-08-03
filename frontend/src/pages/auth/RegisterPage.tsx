import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import AuthIcon from "../../components/AuthImage";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAuthorStore from "@/store/authorStore";

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Минимальная длина 2 символа" }),
    surname: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
    age: z
      .number()
      .min(6, { message: "Сайт предназначен для людей старше 6 лет" }),
    email: z.string().email("Неверный формат email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string().min(6, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const { createAuthor } = useAuthorStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: undefined,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await createAuthor({
        name: data.name,
        surname: data.surname,
        email: data.email,
        age: data.age,
        password: data.password,
      });
      console.log("Пользователь создан");
      toast("Войдите пожалуйста");
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-0 m-0 bg-gray-200">
      <motion.div
        className="flex items-center justify-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Форма */}
        <motion.div className="w-1/2 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>

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

            {/* Фамилия */}
            <div>
              <input
                {...register("surname")}
                placeholder="Фамилия"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.surname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.surname.message}
                </p>
              )}
            </div>

            {/* Возраст */}
            <div>
              <input
                type="number"
                placeholder="Возраст"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("age", {
                  valueAsNumber: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              />
              {errors.surname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age?.message}
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

            {/* Повт пароль */}
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Подтвердите пароль"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-700 font-medium hover:bg-amber-800 text-white py-3 px-2 rounded disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Загрузка..." : "Зарегистрироваться"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                type="button"
                onClick={() => navigate("/")}
                className="w-full bg-white text-gray-900 font-medium p-2 rounded  hover:text-gray-800 duration-1000 disabled:opacity-50 transition-colors"
              >
                Уже есть аккаунт? Войти
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Изображение справа */}
        <AuthIcon />
      </motion.div>
    </div>
  );
};

export default RegisterPage;
