import React from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import space from "./space.MP4"; // Импортируйте ваше видео

function App() {
  return (
    <div className="App">
      <header  className="App-header">
      <video autoPlay loop muted className="background-video">
          <source src={space} type="video/mp4" />
        </video>
        <AppRouter />
      </header>
    </div>
  );
}

export default App;
