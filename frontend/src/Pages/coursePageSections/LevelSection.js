import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

// import axios from 'axios';

const LevelSection = ({ updateSectionState, beginnerDisable, interDisable, expertDisable ,userData}) => {

    const [begProgress, setBegProgress] = useState(0);
    const [interProgress, setInterProgress] = useState(0);
    const [expertProgress, setExpertProgress] = useState(0);


    const handleClick = (event) => {
        // Call the function passed from the parent to update its state
        updateSectionState(event.target.value);
    };

    useEffect(() => {
        

        if(userData.BeginnerSolved != null && userData.BeginnerSolved.length > 0)
        {
            setBegProgress(((userData.BeginnerSolved.filter(value => value === true).length) / (userData.BeginnerSolved.length))*100);
            // console.log(begProgress);
        }
        if(userData.IntermediateSolved != null && userData.IntermediateSolved.length > 0)
        {
            setInterProgress(((userData.IntermediateSolved.filter(value => value === true).length) / (userData.IntermediateSolved.length))*100);
            // console.log(interProgress);
        }
        if(userData.ExpertSolved != null && userData.ExpertSolved.length > 0)
        {
            setExpertProgress(((userData.ExpertSolved.filter(value => value === true).length) / (userData.ExpertSolved.length))*100);
            // console.log(interProgress);
        }

        // if(userData.IntermediaterSolved.length > 0)
        // {
        //     console.log("1" + userData)
        // }
    }, [userData])



    // console.log(level);
    return (
        <div>
            <div className='level_cards'>
                <div class="card level_card" style={{ width: "18rem" }}>
                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                    <div class="card-body title-section">
                        <h5 class="card-title">Beginner Level</h5>
                        <p class="card-text description">Unlock the basics of understanding spoken language visually in our Beginner Lip Reading course.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item progressBar">
                            <p>Progress: </p>
                            <ProgressBar now={begProgress} />
                        </li>
                    </ul>
                    <div class="card-body button-section">
                        <button disabled={beginnerDisable} onClick={handleClick} class="btn btn-primary" id='sectionBTN' value="beginner" >Continue</button>
                    </div>
                </div>

                <div class="card level_card" style={{ width: "18rem" }}>
                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                    <div class="card-body title-section">
                        <h5 class="card-title">Intermediate Level</h5>
                        <p class="card-text description">Advance your visual language skills in our Intermediate Lip Reading course.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item progressBar">
                            <p>Progress: </p>
                            <ProgressBar now={interProgress} />
                        </li>
                    </ul>
                    <div class="card-body button-section">
                        <button disabled={interDisable} onClick={handleClick} href="#" class="btn btn-primary" id='sectionBTN' value="intermediate">Continue</button>
                    </div>
                </div>

                <div class="card level_card" style={{ width: "18rem" }}>
                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                    <div class="card-body title-section">
                        <h5 class="card-title">Expert Level</h5>
                        <p class="card-text description">Hone your expertise in our Expert Level Lip Reading course.  </p>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item progressBar">
                            <p>Progress: </p>
                            <ProgressBar now={expertProgress} />
                        </li>
                    </ul>
                    <div class="card-body button-section">
                        <button disabled={expertDisable} onClick={handleClick} href="#" class="btn btn-primary" id='sectionBTN' value="expert">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LevelSection
