import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatPage } from "./views/chatPage";
import { LandingPage } from "./views/landingPage";
import { Navbar } from "./components/navbar";

export const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/sike" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
};
