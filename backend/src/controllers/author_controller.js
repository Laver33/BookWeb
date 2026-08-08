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

    const authorsWithStats = authors.map((author) => ({
      ...author,
      totalLikes: author.books.reduce(
        (sum, book) => sum + (book.likes || 0),
        0,
      ),
      totalViews: author.books.reduce(
        (sum, book) => sum + (book.views || 0),
        0,
      ),
      totalRecommendations: author.books.reduce(
        (sum, book) => sum + (book.recommendations || 0),
        0,
      ),
    }));

    res.json(authorsWithStats);
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
    const authorStats = authors.map((author) => ({
      ...author,
      totalLikes: author.books.reduce(
        (sum, book) => sum + (book.likes || 0),
        0,
      ),
      totalViews: author.books.reduce(
        (sum, book) => sum + (book.views || 0),
        0,
      ),
      totalRecommendations: author.books.reduce(
        (sum, book) => sum + (book.recommendations || 0),
        0,
      ),
    }));

    res.json(authorStats);
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
