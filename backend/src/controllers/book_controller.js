import { prisma } from "../lib/prisma.js";

export const findBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        notes: true,
      },
    });

    res.status(200).json(books);
  } catch (e) {
    res.status(500).json({
      message: "Проблема с поиском книг",
      error: e.message,
    });
  }
};

export const findBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Не указан id книги",
      });
    }

    const book = await prisma.$transaction(async (tx) => {
      // просмотры
      await tx.book.update({
        where: { id },
        data: {
          views: { increment: 1 },
        },
      });

      // книга
      return tx.book.findUnique({
        where: { id },
        include: {
          author: true,
          notes: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
    });

    if (!book) {
      return res.status(404).json({
        message: "Книга не найдена",
      });
    }

    res.status(200).json(book);
  } catch (e) {
    res.status(500).json({
      message: "Проблема с поиском книги",
      error: e.message,
    });
  }
};

export const putRecommendBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.$transaction(async (tx) => {
      const existingBook = await tx.book.findUnique({
        where: { id },
        select: { authorId: true },
      });

      if (!existingBook) {
        throw new Error("Книга не найдена");
      }

      tx.author.update({
        where: { id: existingBook.authorId },
        data: { totalRecommendations: { increment: 1 } },
      });

      return await tx.book.update({
        where: { id },
        data: {
          recommendations: { increment: 1 },
        },
        include: {
          author: true,
          notes: true,
        },
      });
    });

    res.status(200).json({
      message: "Рекомендация успешно добавлена",
      book,
    });
  } catch (e) {
    res.status(500).json({
      message: "Проблема с рекомендацией",
      error: e.message,
    });
  }
};

export const putUnrecommendBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.$transaction(async (tx) => {
      const existingBook = await tx.book.findUnique({
        where: { id },
        select: { authorId: true },
      });

      if (!existingBook) {
        throw new Error("Книга не найдена");
      }

      tx.author.update({
        where: { id: existingBook.authorId },
        data: { totalRecommendations: { decrement: 1 } },
      });

      return await tx.book.update({
        where: { id },
        data: {
          recommendations: { decrement: 1 },
        },
        include: {
          author: true,
          notes: true,
        },
      });
    });

    res.status(200).json({
      message: "Рекомендация успешно добавлена",
      book,
    });
  } catch (e) {
    res.status(500).json({
      message: "Проблема с рекомендацией",
      error: e.message,
    });
  }
};

export const putLikeBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.$transaction(async (tx) => {
      const existingBook = await tx.book.findUnique({
        where: { id },
        select: { authorId: true },
      });

      if (!existingBook) {
        throw new Error("Книга не найдена");
      }

      await tx.author.update({
        where: { id: existingBook.authorId },
        data: { totalLikes: { increment: 1 } },
      });

      return await tx.book.update({
        where: { id },
        data: {
          likes: { increment: 1 },
        },
        include: {
          author: true,
          notes: true,
        },
      });
    });

    res.status(200).json({
      message: "Лайк успешно добавлен",
      book,
    });
  } catch (e) {
    res.status(500).json({
      message: "Проблема с лайком",
      error: e.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Не указан id книги",
      });
    }

    const book = await prisma.book.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Книга успешно удалена",
    });
  } catch (e) {
    res.status(500).json({
      message: "Проблема с удалением книги",
      error: e.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, authorId } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Не указан id книги",
      });
    }

    if (!title && !description && !authorId) {
      return res.status(400).json({
        message: "Нет данных для обновления",
      });
    }

    const book = await prisma.book.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(authorId && { authorId }),
      },
      include: {
        author: true,
        notes: true,
      },
    });

    res.status(200).json({
      message: "Книга успешно обновлена",
      book,
    });
  } catch (e) {
    res.status(500).json({
      message: "Проблема с обновлением книги",
      error: e.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const authorId = req.user.id;

    if (!title || !description || !authorId) {
      return res.status(400).json({
        message: "Не все обязательные поля заполнены",
      });
    }

    const authorExists = await prisma.author.findUnique({
      where: { id: authorId },
    });
    if (!authorExists) {
      return res.status(404).json({
        message: "Автор с таким ID не найден",
      });
    }

    const book = await prisma.book.create({
      data: {
        title,
        description,
        authorId,
        price: price || 0,
      },
    });

    res.status(201).json(book);
  } catch (e) {
    res.status(500).json({
      message: "Проблема с созданием книги",
      error: e.message,
    });
  }
};
