import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FuturisticInterface from "./components/FuturisticInterface";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FuturisticInterface />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;