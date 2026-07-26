import { prisma } from "../lib/prisma.js";

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
