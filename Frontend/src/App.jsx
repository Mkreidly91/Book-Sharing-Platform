import { useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import SignInForm from './Components/Forms/SignInForm';
import SignUpForm from './Components/Forms/SignUpForm';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<SignInForm className={'bg-red-200'} />} />
        <Route
          path="/signUp"
          element={<SignUpForm className={'bg-red-200'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
