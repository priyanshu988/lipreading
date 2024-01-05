import React, { useState } from 'react'
import "../utils/style.css";
import login_thumbnail from "../utils/login_thumbnail.png";
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';


const BACKEND_URI = "http://localhost:3000/auth/";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const homeURL = "/";


  const navigateToHome = (e) => {
    // navigate({homeURL});  
    // e.preventDefault();
    // Redirect to home page with email as a URL parameter
    navigate(`/?email=${encodeURIComponent(email)}`);
  }


  return (
    <div className=" login-form">
      <img className='login-thumbnail' src={login_thumbnail} alt='' />
      <form className='inputs'>
        <input type='text' placeholder='Username' className='form-control username' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type='password' placeholder='Password' className='form-control password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <p className='forgotpasswordlink'>Forgot Password? <a href='/forgotPassword'>Click Here</a></p>
      </form>
      <div className='inputs1'>
        <button type='submit' className='form-control submitBtn' onClick={async (e) => {
          // send fetch (POST) request to server
          const requestOptions = {
            // credentials: 'include',
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
          };

          var res = await fetch(BACKEND_URI + "login", requestOptions);
          alert((await res.json())["msg"]);
          setEmail("");
          setPassword("");
          if (res.status === 200) {
            // Cookies.set('sessionid', res.sessionId, { expires: 1 })
            // sessionStorage.setItem("curr_email", email);
            navigateToHome();
          }
        }}> Login </button>
      </div>
      <p className='forgotpasswordlink'>Not Having a Account? <a href='/register'>Create now</a></p>

    </div>
  );
}

export default Login