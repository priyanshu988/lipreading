import React, { useEffect, useState } from 'react'
import "../utils/style.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import login_thumbnail from "../utils/login_thumbnail.png";
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
const BACKEND_URI = "http://localhost:3000/auth/";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    // const navigate = useNavigate();
    const [profession, setProfession] = useState("");
    const [dob, setDOB] = useState("");
    const [beginnerVideoData, setBeginnerVideoData] = useState([])
    const [interVideoData, setInterVideoData] = useState([])
    const [expertVideoData, setExpertVideoData] = useState([])
    const navigate = useNavigate();

    const navigatetoLogin = (e) => {
        // navigate({homeURL});  
        // e.preventDefault();
        // Redirect to home page with email as a URL parameter
        navigate("/login");
    }


    useEffect(() => {
        // Function to fetch user data from the backend
        const fetchVideoData = async (level) => {

            try {
                // console.log(`http://localhost:3000/auth/fetchVideoData?Level=${level}`);
                const response = await axios.get(`http://localhost:3000/auth/fetchVideoData?Level=${level}`);
                setBeginnerVideoData(response.data);
                console.log("useeffect")

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchVideoData2 = async (level) => {

            try {
                // console.log(`http://localhost:3000/auth/fetchVideoData?Level=${level}`);
                const response = await axios.get(`http://localhost:3000/auth/fetchVideoData?Level=${level}`);
                setInterVideoData(response.data);
                console.log("useeffect")

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchVideoData3 = async (level) => {

            try {
                // console.log(`http://localhost:3000/auth/fetchVideoData?Level=${level}`);
                const response = await axios.get(`http://localhost:3000/auth/fetchVideoData?Level=${level}`);
                setExpertVideoData(response.data);
                console.log("useeffect")

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        // Call the fetchUserData function when the component mounts
        fetchVideoData("beginner");
        fetchVideoData2("intermediate");
        fetchVideoData3("expert");

    }, []);



    return (
        <div className=" register-form">
            <h1 className='registerPageHeading'>REGISTER</h1>
            <hr />
            <form className='inputs'>
                <div className='name_dob_input'>
                    <input type='text' placeholder='Full Name' className='form-control full_name' value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type='date' placeholder='DOB' className='form-control dob' value={dob} onChange={(e) => setDOB(e.target.value)} required />
                </div>
                <input type='text' placeholder='Profession' className='form-control username' value={profession} onChange={(e) => setProfession(e.target.value)} />
                <input type='email' placeholder='Email' className='form-control username' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type='password' placeholder='Password' className='form-control password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </form>
            <div className='inputs1'>
                <button type='submit' className='form-control registerSubmitBtn ' onClick={async (e) => {
                    // send fetch (POST) request to server
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        mode: 'cors',
                        body: JSON.stringify({ email: email, password: password, profession: profession, name: name, dateOfBirth: dob, BeginnerSolved: beginnerVideoData.length, ExpertSolved: expertVideoData.length, IntermediateSolved: interVideoData.length })
                    };

                    var res = await fetch(BACKEND_URI + "register", requestOptions);
                    console.log(res);
                    alert((await res.json())["msg"]);
                    setEmail("");
                    setPassword("");
                    setName("");
                    setProfession("")
                    setDOB("");
                    navigatetoLogin();
                }}> Register </button>
            </div>
            <p className='forgotpasswordlink'>Already Have a Account? <a href='/login'>Login</a></p>


        </div>
    );
}

export default Register