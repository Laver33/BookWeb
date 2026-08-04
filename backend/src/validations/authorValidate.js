import { body } from "express-validator";

export const addAuthorValidator = [
  body("email", "Введите корректную почту.").isEmail(),
  body("name", "Имя должно быть длинее 1 символа.").isLength({ min: 2 }),
  body("surname", "Фамилия должна быть длинее 3-х символов.").isLength({
    min: 3,
  }),
];
