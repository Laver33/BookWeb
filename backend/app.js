import "dotenv/config";
import express from "express";
import { prisma } from "./src/lib/prisma.js";

// Контроллеры
import * as bookController from "./src/controllers/book_controller.js";
import * as authorController from "./src/controllers/author_controller.js";
import * as noteController from "./src/controllers/note_controller.js";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`Бекенд стартанул: http://localhost:${port}`);
});

// Операции над книгами
app.get("/books", bookController.findBooks);
app.get("/book:id", bookController.findBook);
app.delete("/book:id", bookController.deleteBook);
app.delete("/books", bookController.deleteAllBooks);
app.put("/book:id", bookController.updateBook);

// Операции над авторами
app.get("/authors", authorController.findAuthors);
app.get("/author:id", authorController.findAuthor);
app.delete("/author:id", authorController.deleteAuthor);
// app.put("/author:id", authorController.updateAuthor);

// Операции над заметками
app.get("/notes", noteController.findNotes);
app.get("/note:id", noteController.findNote);
app.delete("/book:id", noteController.deleteNote);
