import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Токен не предоставлен" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Неверный формат токена" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decoded;

    next();
  } catch (e) {
    return res.status(401).json({ message: "Неверный токен" });
  }
};
