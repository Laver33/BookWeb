import { prisma } from "../lib/prisma.js";

export const findNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      include: {
        book: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (notes.length === 0) {
      return res.status(404).json({
        message: "Заметки не найдены",
      });
    }

    res.json(notes);
  } catch (e) {
    res.status(500).json({
      message: "Заметки не найдены",
      error: e.message,
    });
  }
};

export const findNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID не найден",
      });
    }

    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      return res.status(404).json({
        message: "Заметка не найдена",
      });
    }

    res.json(note);
  } catch (e) {
    res.status(500).json({
      message: "Заметка не найдена",
      error: e.message,
    });
  }
};
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const delNote = await prisma.note.findUnique({
      where: { id },
    });

    if (!delNote) {
      return res.status(404).json({
        message: "Заметка не найдена",
      });
    }

    await prisma.note.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Заметка успешно удалена",
    });
  } catch (e) {
    res.status(500).json({
      message: "Заметка не удалена",
      error: e.message,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID не найден",
      });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Содержание не найдено",
      });
    }

    const note = await prisma.note.update({
      where: { id },
      data: { content },
    });

    res.json(note);
  } catch (e) {
    res.status(500).json({
      message: "Заметка не обновлена",
      error: e.message,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const { bookId } = req.params;

    if (!content) {
      return res.status(400).json({
        message: "Поле пустое",
      });
    }

    const noteExists = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!noteExists) {
      return res.status(404).json({
        message: "Книга с таким ID не найдена",
      });
    }

    const note = await prisma.note.create({
      data: {
        content,
        bookId,
      },
    });

    res.status(201).json(note);
  } catch (e) {
    res.status(500).json({
      message: "Проблема с созданием заметки",
      error: e.message,
    });
  }
};

export const getNotesByBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return res.status(404).json({
        message: "Книга не найдена",
      });
    }

    const notes = await prisma.note.findMany({
      where: { bookId },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      bookId,
      total: notes.length,
      notes,
    });
  } catch (e) {
    res.status(500).json({
      message: "Ошибка получения заметок",
      error: e.message,
    });
  }
};
