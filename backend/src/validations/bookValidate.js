import { body } from 'express-validator';

export const addBookValidator = [
    body('title', 'Введите корректное название.').isLength({ max: 100, min: 2}),
    body('description',  'Описание должно быть до 3000 символов').isLength({ man: 3000 }),
]


