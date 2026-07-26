import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import NotePage from "./pages/NotePage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function AppContent() {
  return (
    <main className="p-6">
      <Routes>
        {/* Авторизация и регистрация */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Остальное */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/author/:id" element={<AuthorDetailPage />} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
