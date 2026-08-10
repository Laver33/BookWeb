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
import useNoteStore from "@/store/noteStore.ts";
import { useParams } from "react-router";

const noteSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Количество символов должно быть не менее 3" })
    .max(300, { message: "Количество символов не должно превышать 300" }),
});

type noteFormData = z.infer<typeof noteSchema>;

const DialogAddNote = () => {
  const { id } = useParams();
  const { createNote } = useNoteStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<noteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit: SubmitHandler<noteFormData> = async (data) => {
    try {
      if (!id) {
        return console.error("Не удалось добавить заметку");
      }
      await createNote({
        content: data.content,
        bookId: id,
      });
      toast("Готово");
    } catch (e) {
      console.error("ошибка: " + e);
      toast("Ошибка добавления");
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger>
          <p className="text-white font-medium">Добавить заметку</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Добавление заметки
            </DialogTitle>
          </DialogHeader>
          <label>Текст заметки</label>
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
          <DialogDescription>
            <span className="font-bold text-black dark:text-white">
              Кратко:{" "}
            </span>{" "}
            Сдесь вы можете добавить заметку к книге. Для начала, убедитесь, что
            все данные для добавления заметки заполнены правильно. Затем,
            нажмите на кнопку "Добавить заметку". После этого, вам нужно будет
            заполнить поля для описания заметки.
          </DialogDescription>
          <div className="flex gap-4">
            {/* Отправка заметки */}
            <motion.button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              className="w-full font-medium text-sm bg-amber-700 text-white py-3 px-2 rounded "
            >
              {isSubmitting ? "Загрузка..." : "Добавить заметку"}
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

export default DialogAddNote;
