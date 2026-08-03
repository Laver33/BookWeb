import "dotenv/config";
import express from "express";
import { prisma } from "./src/lib/prisma.js";
import cors from "cors";

// Контроллеры
import * as bookController from "./src/controllers/book_controller.js";
import * as authorController from "./src/controllers/author_controller.js";
import * as noteController from "./src/controllers/note_controller.js";
import * as authController from "./src/controllers/auth_controller.js";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`Бекенд стартанул: http://localhost:${port}`);
});

// Вход и регистрация
app.post("/auth/register", authController.createAuthor);
app.get("/auth/login", authController.loginAuthor);

// Операции над книгами
app.post("/book", bookController.createBook);
app.get("/books", bookController.findBooks);
app.get("/book/:id", bookController.findBook);
app.delete("/book:id", bookController.deleteBook);
app.delete("/books", bookController.deleteAllBooks);
app.put("/book:id", bookController.updateBook);

// Операции над авторами
app.get("/authors", authorController.findAuthors);
app.get("/author:id", authorController.findAuthor);
app.delete("/author:id", authorController.deleteAuthor);
app.put("/author:id", authorController.updateAuthor);

// Операции над заметками
// app.post("/note", noteController.createNote); // создать
app.get("/notes", noteController.findNotes);
app.get("/note:id", noteController.findNote);
app.delete("/book:id", noteController.deleteNote);
app.put("/author:id", noteController.updateNote);
