import { motion } from "framer-motion";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useBookStore from "@/store/bookStore.ts";

const bookSchema = z.object({
  title: z
    .string({ message: "Название должно быть" })
    .min(2, { message: "Название должно быть не менее 3 символов" })
    .max(30, { message: "Название не должно быть длинее 30 символов" }),
  description: z
    .string()
    .min(20, { message: "Не меньше 20 символов" })
    .max(2000, { message: "Описание книги не должно привышать 2000 символов" }),
  price: z.number().min(1, { message: "Минимальная цена — 1" }),
});

type bookFormData = z.infer<typeof bookSchema>;

const DialogAddBook = () => {
  const { createBook } = useBookStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<bookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
    },
  });
  const onSubmit: SubmitHandler<bookFormData> = async (data) => {
    try {
      await createBook({
        title: data.title,
        description: data.description,
        price: data.price,
      });
      console.log(data);
      toast("Книга добавленна");
    } catch (e) {
      console.error("ошибка: " + e);
      toast("Ошибка добавления");
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger>Добавить книгу</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Добавление книги</DialogTitle>
          </DialogHeader>
          <label>Название</label>
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
          <label>Описание</label>
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
          <label>Приблезительная цена</label>
          <input
            type="number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("price", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
          <DialogDescription>
            <span className="font-bold text-black">Кратко: </span> Сдесь вы
            можете добавить новую книгу в общую библиотеку. Для начала,
            убедитесь, что все данные для добавления книги заполнены правильно.
            Затем, нажмите на кнопку "Добавить книгу" и выберите нужную
            категорию из списка. После этого, вам нужно будет заполнить поля для
            описания книги и приблезительную цену.
          </DialogDescription>
          <div className="flex gap-4">
            {/* Отправка книги */}
            <motion.button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              className="w-full font-medium text-sm bg-amber-700 text-white py-3 px-2 rounded "
            >
              {isSubmitting ? "Загрузка..." : "Добавить книгу"}
            </motion.button>

            {/* Очистка */}
            <motion.button
              onClick={() => reset()}
              whileHover={{ scale: 1.02 }}
              className="w-full font-medium text-sm border-amber-700 border text-amber-700 py-3 px-2 rounded "
            >
              Очистка
            </motion.button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DialogAddBook;
