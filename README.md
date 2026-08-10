# 📚 BookWeb

Fullstack веб-приложение для управления книгами, заметками и рекомендациями.

Проект находится в активной разработке.

## 🛠️ Технологии

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT + bcrypt (аутентификация)
- express-validator
- Nodemailer

### Frontend
- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Zustand
- React Hook Form + Zod
- Axios
- React Router
- Framer Motion (Motion)

## ✨ Функционал

- Регистрация и авторизация (JWT)
- CRUD книг и авторов
- Заметки к книгам
- Система лайков, просмотров и рекомендаций
- Агрегированная статистика (totalLikes, totalViews, totalRecommendations)
- Адаптивный интерфейс

### 1. Backend

cd backend
npm install
# Настрой .env (DATABASE_URL, JWT_SECRET и т.д.)
npx prisma migrate dev
npm run dev

### 2. Frontend
Bashcd frontend
npm install
npm run dev


### 📁 Структура
textBookWeb/
├── backend/          # Express + Prisma
├── frontend/         # React + Vite
└── tests/            # Тесты


Проект в разработке. Основные CRUD-операции и система рекомендаций уже реализованы. 
