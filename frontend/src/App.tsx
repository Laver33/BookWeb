// App.tsx
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import NotePage from "./pages/NotePage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Navigate from "./components/Navigate";
import Footer from "./components/Footer";
import TopAuthorsPage from "./pages/TopAuthors";
import { useState } from "react";

import "./index.css";
import CurrentAuthorPage from "./pages/CurrentAuthorPage";

function Layout() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <Navigate theme={theme} toggleTheme={toggleTheme} />
      <div className="pb-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function AppContent() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<Layout />}>
          <Route path="/me" element={<CurrentAuthorPage />} />
          <Route path="/top" element={<TopAuthorsPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/author/:id" element={<AuthorDetailPage />} />
        </Route>
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
