import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import {
  BarChart,
  Bar,
} from "recharts";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const location = useLocation();
  const [buttonstat, setButtonStat] = useState("beginner");
  const [userData, setUserData] = useState({});
  const [videoWatched, setVideoWatched] = useState(0);
  const [videoBeginnerWatched, setVideoBeginnerWatched] = useState(0);
  const [videoInterWatched, setVideoInterWatched] = useState(0);
  const [videoExpertWatched, setVideoExpertrWatched] = useState(0);
  const [attepmts, setAttempts] = useState(0);
  const [attepmtsBeg, setAttemptsBeg] = useState(0);
  const [attepmtsInter, setAttemptsInter] = useState(0);
  const [attepmtsExp, setAttemptsExp] = useState(0);



  const email = new URLSearchParams(location.search).get('email');


  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await axios.get(`http://localhost:3000/auth/fetchUserData?email=${email}`);
        setUserData(response.data);
        if (userData.BeginnerSolved != null) {
          setVideoWatched(userData.BeginnerSolved.filter(value => value === true).length)
          setVideoBeginnerWatched(userData.BeginnerSolved.filter(value => value === true).length)
          setAttempts(attepmts + (userData.BeginnerAttempts.reduce((a, v) => a = a + v, 0)))
          setAttemptsBeg(((userData.BeginnerAttempts.reduce((a, v) => a = a + v, 0)) / userData.BeginnerAttempts.length).toFixed())
          console.log(videoWatched)
        }
        if (userData.IntermediateSolved != null) {
          setVideoWatched(videoWatched + (userData.IntermediateSolved.filter(value => value === true).length))
          setVideoInterWatched((userData.IntermediateSolved.filter(value => value === true).length))
          setAttempts(attepmts + (userData.IntermediateAttempts.reduce((a, v) => a = a + v, 0)))
          setAttemptsInter(((userData.IntermediateAttempts.reduce((a, v) => a = a + v, 0)) / userData.IntermediateAttempts.length).toFixed())
        }
        if (userData.ExpertSolved != null) {
          setVideoWatched(videoWatched + (userData.ExpertSolved.filter(value => value === true).length))
          setVideoExpertrWatched((userData.ExpertSolved.filter(value => value === true).length))
          setAttempts(attepmts + (userData.ExpertAttempts.reduce((a, v) => a = a + v, 0)))
          setAttemptsExp(((userData.ExpertAttempts.reduce((a, v) => a = a + v, 0)) / userData.ExpertAttempts.length).toFixed())

        }
        // console.log("sum" + (userData.BeginnerAttempts.reduce((a,v) =>  a = a + v , 0 )))
        setAttempts((attepmts / (userData.BeginnerAttempts.length + userData.IntermediateAttempts.length + userData.ExpertAttempts.length)).toFixed())
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData()

  }, [email, videoWatched])

  const navigate = useNavigate()
  useEffect(() => {
    if (email === "null") navigate('/login')
  }, [email])

  const handleButtonClick = (e) => {
    setButtonStat(e.target.value);
  }


  const data = [
    {
      day: "Monday",
      videosWatched: 2
    },
    {
      day: "Tuesday",
      videosWatched: 3
    },
    {
      day: "Wednesday",
      videosWatched: 1
    },
    {
      day: "Friday",
      videosWatched: 4
    },
    {
      day: "Saturday",
      videosWatched: 1
    },
    {
      day: "Sunday",
      videosWatched: 2
    }
  ]
  return (
    <div className='dashboardBody'>
      <NavBar active="dashboard" email={email} />

      <div className='dashboard'>
        <div className='sidebar col-3'>

          <div className='list-group'>
            <button onClick={handleButtonClick} value={"beginner"} type="button" class="list-group-item list-group-item-dark list-group-item-action" aria-current="true">
              Beginner Level
            </button>
            <button onClick={handleButtonClick} value={"intermediate"} type="button" class="list-group-item list-group-item-dark list-group-item-action">Intermediate Level</button>
            <button onClick={handleButtonClick} value={"expert"} type="button" class="list-group-item list-group-item-dark list-group-item-action">Expert Level</button>
            {/* <button onClick={handleButtonClick} value={"overall"} type="button" class="list-group-item list-group-item-dark list-group-item-action">Overall</button> */}
          </div>
        </div>
        <div className='dashboardBody col-9'>
          <div className='row justify-content-center mt-5'>
            <div className='h-25 card col-3'>
              <div className='card-header'>
                <h5 className='card-title'>Videos watched</h5>
              </div>
              <div className='card-body'>
                {
                  buttonstat === "beginner" ?
                    <>
                      <p className='cardAmt'>{videoBeginnerWatched}</p>
                    </> :
                    <>
                      {
                        buttonstat === "intermediate" ?
                          <>
                            <p className='cardAmt'>{videoInterWatched}</p>
                          </> :
                          <>
                            {
                              buttonstat === "expert" ?
                                <>
                                  <p className='cardAmt'>{videoExpertWatched}</p>
                                </> :
                                <>
                                  <p className='cardAmt'>{videoWatched}</p>
                                </>
                            }
                          </>
                      }
                    </>
                }


              </div>
            </div>
            <div className='statCard card col-3 me-5 ms-5'>
              <div className='card-header'>
                <h5 className='card-title'>Attempts per Video</h5>
              </div>
              <div className='card-body'>

              {
                  buttonstat === "beginner" ?
                    <>
                      <p className='cardAmt'>{attepmtsBeg}</p>
                    </> :
                    <>
                      {
                        buttonstat === "intermediate" ?
                          <>
                            <p className='cardAmt'>{attepmtsInter}</p>
                          </> :
                          <>
                            {
                              buttonstat === "expert" ?
                                <>
                                  <p className='cardAmt'>{attepmtsExp}</p>
                                </> :
                                <>
                                  <p className='cardAmt'>{attepmts}</p>
                                </>
                            }
                          </>
                      }
                    </>
                }
              </div>
            </div>
            <div className='statCard card col-3'>
              <div className='card-header'>
                <h5 className='card-title'>Accuracy</h5>
              </div>
              <div className='card-body'>

                <p className='cardAmt'>50%</p>
              </div>
            </div>
          </div>
          <div className='row mt-5 justify-content-center'>
            <h3 className='ms-5'>Weekly Status:</h3>
            <BarChart width={400} height={350} data={data}>
              <Bar dataKey="videosWatched" fill="#8884d8" />
            </BarChart>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
