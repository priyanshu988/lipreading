import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactPlayer from 'react-player'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const VideoSection = ({ level, email }) => {

  const [videoData, setVideoData] = useState([])
  const [videoLink, setVideoLink] = useState("")
  const [videoOptions, setVideoOptions] = useState([])
  const [videoAns, setVideoAns] = useState("")
  const [videoNumber, setVideoNumber] = useState()
  const [count, setCount] = useState(false)
  const [userData, setUserData] = useState({});
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);


  const updateVideoSolved = async () => {
    try {

      const response = await fetch('http://localhost:3000/auth/updateVideoSolved', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, email, videoNumber }),
      });
      const data = await response.json();
      console.log('Updated user:', data);

    } catch (error) {
      console.error('Error:', error);
    }
  }
  const updateVideoAttempt = async () => {
    try {

      const response = await fetch('http://localhost:3000/auth/updateVideoAttempt', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, email, videoNumber }),
      });
      const data = await response.json();
      console.log('Updated user:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    // Function to fetch user data from the backend
    const fetchVideoData = async () => {

      try {
        // console.log(`http://localhost:3000/auth/fetchVideoData?Level=${level}`);
        const response = await axios.get(`http://localhost:3000/auth/fetchVideoData?Level=${level}`);
        setVideoData(response.data);
        console.log("useeffect")

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchUserData = async () => {

      try {
        const response = await axios.get(`http://localhost:3000/auth/fetchUserData?email=${email}`);
        setUserData(response.data);
        if (userData.BeginnerSolved != null && level === "beginner") {
          setProgress((userData.BeginnerSolved.filter(value => value === true).length) / ((userData.BeginnerSolved.length)));
          setPercentage((progress * 100).toFixed(2))
    
          
        }
        else if (userData.IntermediateSolved != null && level === "intermediate") {
          setProgress((userData.IntermediateSolved.filter(value => value === true).length) / ((userData.IntermediateSolved.length)));
          setPercentage((progress * 100).toFixed(2));
    
        }
        else if (userData.ExpertSolved != null && level === "expert") {
          setProgress((userData.ExpertSolved.filter(value => value === true).length) / ((userData.ExpertSolved.length)));
          setPercentage((progress * 100).toFixed(2));
    
        }
        console.log(percentage)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    console.log(count);
    // Call the fetchUserData function when the component mounts
    fetchVideoData();
    fetchUserData();
    
   
    
  }, [level, email, count, percentage]);

  const handleoptions = (e) => {
    // console.log(e.target.value)
    if (e.target.value === videoAns) {
      alert("correct");
      updateVideoSolved();
      updateVideoAttempt();
      setCount(!count);
    }
    else {
      alert("incorrect");
      updateVideoAttempt();
      setCount(!count);

    }
  }

  const handlevideobutton = (e) => {
    const video = JSON.parse(e.target.value)
    setVideoLink(video.Link)
    setVideoOptions(video.Options)
    setVideoAns(video.Answer)
    setVideoNumber(video.Number);
    console.log(videoOptions[0]);
  }
  // console.log(videoData);
  return (
    <div className='videosection'>
      <div className='video-sidebar'>
        {
          videoData ?
            <>
              {videoData.map((itemm) => (
                <>
                  <div className='sidebarContent'>
                    <button button type='button' onClick={handlevideobutton} value={JSON.stringify(itemm)} className='form-control btn btn-dark videobtn'>video {itemm.Number}</button>
                    {
                      level === "beginner" ?
                        <>
                          {
                            userData.BeginnerSolved[itemm.Number - 1] ?
                              <><CheckCircleIcon fontSize='large' /></> :
                              <></>
                          }
                        </> :
                        <></>
                    }

                  </div>
                  {/* <hr /> */}
                </>
              ))
              }
            </> :
            <></>
        }


      </div>
      <div className="videoScreen">
        <ReactPlayer url={videoLink} width={"100%"} height={"100%"} />
        <div className='video-options'>
          <button onClick={handleoptions} type="button" class="btn btn-primary optionbtn" value={videoOptions[0]} placeholder={videoOptions[0]}>{videoOptions[0]}</button>
          <button onClick={handleoptions} type="button" class="btn btn-primary optionbtn" value={videoOptions[1]} placeholder={videoOptions[1]}>{videoOptions[1]}</button>
          <button onClick={handleoptions} type="button" class="btn btn-primary optionbtn" value={videoOptions[2]} placeholder={videoOptions[2]}>{videoOptions[2]}</button>
          <button onClick={handleoptions} type="button" class="btn btn-primary optionbtn" value={videoOptions[3]} placeholder={videoOptions[3]}>{videoOptions[3]}</button>
        </div>
      </div>
      <div className='video-rightsidebar'>
        
        <div className='progress-circluar'>
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
        <h2 className='progress-heading'>Progress</h2>
        <br/>
        <br/>
        <h1 className='attemptCount'>{videoNumber && userData.BeginnerAttempts[videoNumber-1]}</h1>
        <h2 className='progress-heading'>Attempts</h2>
      </div>
    </div>
  )
}

export default VideoSection
