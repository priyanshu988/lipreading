// import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import "./utils/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './Pages/Register';
import HomePage from './Pages/HomePage';
import CoursePage from './Pages/CoursePage';
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    <div className='appBody'>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={
          <div className="App">
            <div className="half-background top-background"></div>
            <div className="half-background bottom-background"></div>
            <Login />
          </div>
        } />

        <Route path='/register' element={
          <div className="App">
            <div className="half-background top-background"></div>
            <div className="half-background bottom-background"></div>
            <Register />
          </div>

        } />

        <Route path='/course' element={<CoursePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<HomePage />} />
      </Routes>

    </BrowserRouter>
    </div>

  );
}

export default App;
