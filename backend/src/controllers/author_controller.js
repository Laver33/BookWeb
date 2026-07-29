import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const findAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      include: { books: true },
    });

    if (authors.length === 0) {
      return res.status(404).json({
        message: "Авторы не найдены",
      });
    }

    res.json(authors);
  } catch (e) {
    res.status(500).json({
      message: "Авторы не найдены",
      error: e.message,
    });
  }
};

export const findAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!author) {
      return res.status(404).json({
        message: "Автор не найден",
      });
    }

    res.json(author);
  } catch (e) {
    res.status(500).json({
      message: "Автор не найден",
      error: e.message,
    });
  }
};

// в 2 запроса удаление автора
export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const delAuthor = await prisma.author.findUnique({
      where: { id },
    });

    if (!delAuthor) {
      return res.status(404).json({
        message: "Автор не найден",
      });
    }

    await prisma.author.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Автор успешно удален",
      delAuthor,
    });
  } catch (e) {
    res.status(500).json({
      message: "Автор не найден",
      error: e.message,
    });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname } = req.body;

    const updateAuthor = await prisma.author.update({
      where: { id },
      data: { name, surname },
    });

    if (!updateAuthor) {
      return res.status(404).json({
        message: "Автор не найден",
      });
    }

    res.json(updateAuthor);
  } catch (e) {
    res.status(500).json({
      message: "Автор не найден",
      error: e.message,
    });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const saltRounds = 10;
    const { name, surname, email, password, age } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({
        message: "Не все обязательные поля заполнены",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const author = await prisma.author.create({
      data: {
        name,
        surname,
        email,
        age,
        hashedPassword,
      },
    });

    // Скрываем пароль из ответа
    const { hashedPassword: none, ...authorWithoutPassword } = author;
    res.status(201).json({
      message: "Аккаунт успешно создан",
      author: authorWithoutPassword,
    });
  } catch (e) {
    res.status(500).json({
      message: "Аккаунт не создан",
      error: e.message,
    });
  }
};

// const isMatch1 = await bcrypt.compare("mypassword123", hashedPassword);
// console.log("Верный пароль совпал:", isMatch1);
