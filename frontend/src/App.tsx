import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import NotePage from "./pages/NotePage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Navigate from "./components/Navigate";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div>
      {/* Навигационное меню */}
      <div className="flex">
        {/* <p>fffsfs</p> */}
        <Navigate />
      </div>

      {/* Контент страницы */}
      <div className="pb-16">
        <Outlet />
      </div>

      {/* Подвал */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

function AppContent() {
  return (
    <main>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Защищенные маршруты*/}
        <Route element={<Layout />}>
          {/* <Route path="/top" element={<TopPage />} /> */}
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
