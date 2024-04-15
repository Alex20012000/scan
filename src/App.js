import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/SearchResultPage";

const App = () => (
  <div className="app">
    <Header />
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/login_page" element={<LoginPage />} />
      <Route path="/search_page" element={<SearchPage />} />
      <Route path="/results_page" element={<SearchResultPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
