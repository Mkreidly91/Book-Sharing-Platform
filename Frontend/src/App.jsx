import { useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app h-full">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
