import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import LevelSection from './coursePageSections/LevelSection'
import VideoSection from './coursePageSections/VideoSection';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


// const BACKEND_URI = "http://localhost:3000/auth/";


const CoursePage = () => {

  const [section, setSection] = useState("level");
  const [userData, setUserData] = useState({});
  // const [userVideoData, setUserVideoData] = useState({});
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const [reqLevel, setReqLevel] = useState("");
  const [reqLang, setReqLang] = useState("");
  const [lang, setLang] = useState("");
  // const [begProgress, setBegProgress] = useState();
  // const [interProgress, setInterProgress] = useState();
  // const [expertProgress, setExpertProgress] = useState();
  // const [level, setLevel] = useState("");



  const updateSectionState = (newState) => {
    setSection(newState);
  };

  useEffect(() => {
    // Function to fetch user data from the backend
    const fetchUserData = async () => {

      try {
        const response = await axios.get(`http://localhost:3000/auth/fetchUserData?email=${email}`);
        setReqLang(response.data.RequiredLanguage)
        setReqLevel(response.data.RequiredLevel)
        setUserData(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the fetchUserData function when the component mounts
    fetchUserData();
    
  }, [email, userData]); // Empty dependency array ensures the effect runs only once on mount

  // console.log(userData)
  // console.log(userData.RequiredLevel)
  // console.log(isPopup2Open)

  const handleLangChange = (e) => {
    setLang(e.target.value);
  }

  // const handleLevelChange = (e) => {
  //   setLevel(e.target.value);
  // }

  const handleLangSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/updateLang', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, lang }),
      });
      const data = await response.json();
      setReqLang(lang);
      console.log('Updated user:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (email === "null") navigate('/login')
  }, [email, navigate])

  return (
    <div>
      <NavBar active="course" email={email} />
      <div className='course_page_heading_div'>
        <h4 className='course_page_heading'>Courses</h4>
        <hr />
      </div>
      {
        reqLang === "none" ?
          <>
            <div className='  langQuestion'>
              <p className='questionHeading'>
                PLEASE SELECT THE REQUIRED LANGUAGE
              </p>
              <div className='upperoptions'>
                <div className='option1'>
                  <label >
                    <input
                      type='radio'
                      name='lang'
                      value={"english"}
                      checked={lang === "english"}
                      onChange={handleLangChange}
                    />
                    English
                  </label>
                </div>
                <div className='option2'>
                  <label className='option2'>
                    <input
                      type='radio'
                      name='lang'
                      value={"hindi"}
                      checked={lang === "hindi"}
                      onChange={handleLangChange}
                    />
                    Hindi
                  </label>
                </div>

              </div>
              <div className='loweroptions'>
                <label className='option3'>
                  <input
                    type='radio'
                    name='lang'
                    value={"telugu"}
                    checked={lang === "telugu"}
                    onChange={handleLangChange}
                  />
                  Telugu
                </label>
                <label className='option4'>
                  <input
                    type='radio'
                    name='lang'
                    value={"marathi"}
                    checked={lang === "marathi"}
                    onChange={handleLangChange}
                  />
                  Marathi
                </label>
              </div>
              <button onClick={handleLangSubmit} className='form-control btn btn-primary submitbtn'>Continue</button>
            </div>
          </> :
          <>
            {
              section === "level" ?
                reqLevel === "beginner" ?
                  <LevelSection updateSectionState={updateSectionState} beginnerDisable={false} interDisable={true} expertDisable={true} userData={userData} /> :
                  reqLevel === "intermediate" ?
                    <LevelSection updateSectionState={updateSectionState} beginnerDisable={false} interDisable={false} expertDisable={true} userData={userData} /> :
                    <LevelSection updateSectionState={updateSectionState} beginnerDisable={false} interDisable={false} expertDisable={false} userData={userData} />
                :
                section === "beginner" ?
                  <VideoSection level="beginner" email={email} /> :
                  section === "intermediate" ?
                    <VideoSection level="intermediate" email={email} /> :
                    section === "expert" ?
                      <VideoSection level="expert" email={email} /> :
                      <></>
            }
          </>
      }





    </div>
  )
}

export default CoursePage
