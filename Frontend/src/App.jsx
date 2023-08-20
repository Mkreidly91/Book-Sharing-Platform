import { useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import SignInForm from './Components/Forms/SignInForm';
import SignUpForm from './Components/Forms/SignUpForm';
import SignIn from './Pages/SignIn';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app h-full">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/signUp"
          element={<SignUpForm className={'bg-red-200'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
