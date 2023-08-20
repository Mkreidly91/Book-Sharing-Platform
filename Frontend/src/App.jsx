import { useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app h-full">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
