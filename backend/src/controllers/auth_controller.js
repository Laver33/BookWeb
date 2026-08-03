import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { SendActivateMail } from "../service/mail_service.js";

dotenv.config();
const tokenSecret = process.env.JWT_SECRET_TOKEN;

export const createAuthor = async (req, res) => {
  try {
    const saltRounds = 10;
    const { name, surname, email, password, age } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({
        message: "Не все обязательные поля заполнены",
      });
    }

    const existingUser = await prisma.author.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Пользователь с таким email уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const author = await prisma.author.create({
      data: {
        name,
        surname,
        email,
        age: age ? Number(age) : null,
        hashedPassword,
        isActivated: false,
      },
    });

    // токен для активации
    const activationToken = jwt.sign(
      { email: author.email },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "24h" },
    );

    // Для активации
    const activationLink = `${process.env.FRONTEND_URL}/activate/${activationToken}`;

    await SendActivateMail(author.email, activationLink);

    res.status(201).json({
      message: "Аккаунт создан, актевируйте его через почту",
      author: author,
    });
  } catch (e) {
    console.error("Ошибка создания:", e);
    res.status(500).json({
      message: "Аккаунт не создан",
      error: e.message,
    });
  }
};

export const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email и пароль обязательны",
      });
    }

    const user = await prisma.author.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Неверный email или пароль",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Неверный email или пароль",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      tokenSecret,
      { expiresIn: "30d" },
    );

    res.status(200).json({
      message: "Вход выполнен успешно",
      token,
    });
  } catch (e) {
    console.error("Ошибка входа:", e);
    res.status(500).json({
      message: "Проблема со входом",
      error: e.message,
    });
  }
};
