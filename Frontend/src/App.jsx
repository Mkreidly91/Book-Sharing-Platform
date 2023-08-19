import { useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<h1>hello</h1>} />
      </Routes>
    </div>
  );
}

export default App;
