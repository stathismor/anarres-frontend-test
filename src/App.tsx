import React from "react";
import "./App.css";
import Player from "./components/Player";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <div className="flex flex-col h-screen justify-between">
        <header className="h-10 bg-red-500">Header</header>
        <main className="mb-auto h-10 bg-green-500">Content</main>
        <Player />
      </div>
    </div>
  );
}

export default App;
