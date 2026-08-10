import { body } from "express-validator";

export const addNoteValidator = [
  body("content", "Должно быть больше 3 и меньше 300 символов.").isLength({
    max: 300,
    min: 3,
  }),
];
