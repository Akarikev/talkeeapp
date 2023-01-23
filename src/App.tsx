import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/LoginPage";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./Components/Navbar";
import CreateTalk from "./Pages/create-post/CreateTalk";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createtalk" element={<CreateTalk />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
