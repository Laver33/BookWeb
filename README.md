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

### Tests
- TypeScript
- Playwright
- Faker

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
Настройки .env (DATABASE_URL, JWT_SECRET и т.д.)
npx prisma migrate dev
npm run dev

### 2. Frontend
Bashcd frontend
npm install
npm run dev


Проект в разработке. Основные CRUD-операции и система рекомендаций уже реализованы. 
