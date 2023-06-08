import React, { useEffect, useState } from 'react';
import './Survey.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const Survey = ({ isOpen, toggle, Stakeholder, triggerSurveyToast }) => {

    const [formData, setFormData] = useState({
        stakeholder: Stakeholder.NAME,
        street_address: Stakeholder.STREET,
        mailing_address: Stakeholder.MAILING,
        email: Stakeholder.EMAIL,
        phone: Stakeholder.PHONE,
        familiarity: '',
        receivedFromPMC: [],
        shareInformation: '',
        rating: '',
        permissionRequired: [],
        pipelineMarkers: '',
        diggingProcedure: '',
        heardOfOneCall: '',
        lastUsedOneCall: '',
    });

    useEffect(() => {
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function isFormDataValid(formData) {
        const {
          familiarity,
          receivedFromPMC,
          shareInformation,
          rating,
          permissionRequired,
          pipelineMarkers,
          diggingProcedure,
          heardOfOneCall,
          lastUsedOneCall,
        } = formData;
      
        if (
          familiarity === '' ||
          receivedFromPMC.length === 0 ||
          shareInformation === '' ||
          rating === '' ||
          permissionRequired.length === 0 ||
          pipelineMarkers === '' ||
          diggingProcedure === '' ||
          heardOfOneCall === '' ||
          lastUsedOneCall === ''
        ) {
          return false;
        }
      
        return true;
      }

      function successtoast(name) {
        toast.success(`Successfully submitted survey for ${name}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        window.alert('Thank you for completing the survey!');
        try {
            const accessToken = localStorage.getItem("access-token");
            const headers = { "access-token": accessToken };

            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/survey/take`,
                formData,
                { headers }
            );

            console.log(response.data); // Handle the response from the server
            triggerSurveyToast(Stakeholder.NAME);
            toggle();
        } catch (error) {
            console.error(error);
        }
    };


    const handleCheckboxChange = (event) => {
        const { name, value, checked } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: checked
                ? [...(prevData[name] || []), value]
                : prevData[name].filter((item) => item !== value),
        }));
    };

    if (isOpen) return (
        <div className='survey-container'>
            <div className='survey-background' onClick={() => toggle()}></div>
            <div className='survey-popup'>

                <div className='survey-heading'>
                    <h2>Survey </h2>

                    <div className='survey-stakeholder'>
                        <p>{Stakeholder.NAME}</p>
                        <p>{Stakeholder.MAILING}</p>
                        <p>{Stakeholder.EMAIL}</p>
                        <p>{Stakeholder.PHONE}</p>
                    </div>

                </div>

                <div className='survey-body'>
                    <form onSubmit={handleSubmit}>
                        <div className="question">
                            <p>1. How familiar are you with the location of Plains Midstream Canada (PMC) pipeline near your property?</p>
                            <div className="options">
                                <label>
                                    <input
                                        type="radio"
                                        name="familiarity"
                                        value="specific"
                                        checked={formData.familiarity === 'specific'}
                                        onChange={handleChange}
                                    />
                                    You know the specific location of the pipeline
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="familiarity"
                                        value="general"
                                        checked={formData.familiarity === 'general'}
                                        onChange={handleChange}
                                    />
                                    You know the general location of the pipeline
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="familiarity"
                                        value="unsure"
                                        checked={formData.familiarity === 'unsure'}
                                        onChange={handleChange}
                                    />
                                    You are not sure where the pipeline is located
                                </label>
                            </div>
                        </div>

                        <div className="question">
                            <p>2. In the past two years, do you recall receiving any of the following from PMC? (check all that apply)</p>
                            <div className="options">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="receivedFromPMC"
                                        value="safetyBrochure"
                                        checked={formData.receivedFromPMC.includes('safetyBrochure')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Safety Brochure
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="receivedFromPMC"
                                        value="inPersonVisit"
                                        checked={formData.receivedFromPMC.includes('inPersonVisit')}
                                        onChange={handleCheckboxChange}
                                    />
                                    In-person visit from a PMC representative
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="receivedFromPMC"
                                        value="telephoneCall"
                                        checked={formData.receivedFromPMC.includes('telephoneCall')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Telephone call with pipeline safety-related information
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="receivedFromPMC"
                                        value="email"
                                        checked={formData.receivedFromPMC.includes('email')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Email with pipeline safety-related information
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="receivedFromPMC"
                                        value="safetyMaterials"
                                        checked={formData.receivedFromPMC.includes('safetyMaterials')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Safety-related promotional materials (i.e. fridge magnets, water bottle, etc.)
                                </label>
                            </div>
                        </div>

                        <div className="question">
                            <p>3. In general, do you share the safety information you receive with family and/or employees – either by passing on the information or discussing what you learned?</p>
                            <div className="options">
                                <label>
                                    <input
                                        type="radio"
                                        name="shareInformation"
                                        value="yes"
                                        checked={formData.shareInformation.includes('yes')}
                                        onChange={handleChange}
                                    />
                                    Yes, I share the information with family and/or employees
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="shareInformation"
                                        value="no"
                                        checked={formData.shareInformation.includes('no')}
                                        onChange={handleChange}
                                    />
                                    No, I don't share the information with family and/or employees
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="shareInformation"
                                        value="unsure"
                                        checked={formData.shareInformation.includes('unsure')}
                                        onChange={handleChange}
                                    />
                                    Don't know/ Not sure
                                </label>
                            </div>
                        </div>

                        <div className="question">
                            <p>4. How would you rate the job PMC has been doing in informing you about pipeline safety and pipeline damage prevention?</p>
                            <div className="options">
                                <label>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="excellent"
                                        checked={formData.rating === 'excellent'}
                                        onChange={handleChange}
                                    />
                                    Excellent
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="veryGood"
                                        checked={formData.rating === 'veryGood'}
                                        onChange={handleChange}
                                    />
                                    Very Good
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="good"
                                        checked={formData.rating === 'good'}
                                        onChange={handleChange}
                                    />
                                    Good
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="fair"
                                        checked={formData.rating === 'fair'}
                                        onChange={handleChange}
                                    />
                                    Fair
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="poor"
                                        checked={formData.rating === 'poor'}
                                        onChange={handleChange}
                                    />
                                    Poor
                                </label>
                            </div>
                        </div>

                        <div className="question">
                            <p>
                                5. A pipeline right-of-way is the strip of land over and around a pipeline. A pipeline’s prescribed area is the 30
                                metres (or 100 feet) from the centre line of the pipeline. Certain activities in the pipeline prescribed area require
                                landowners to get permission from PMC before work can be completed. Which of the following activities require
                                permission? (check all that apply)
                            </p>
                            <div className="options">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="permissionRequired"
                                        value="stockpiling"
                                        checked={formData.permissionRequired.includes('stockpiling')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Stockpiling materials
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="permissionRequired"
                                        value="drivingObjects"
                                        checked={formData.permissionRequired.includes('drivingObjects')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Driving objects into the ground and/or excavation
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="permissionRequired"
                                        value="installingFences"
                                        checked={formData.permissionRequired.includes('installingFences')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Installing fences, posts or signage
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="permissionRequired"
                                        value="landscaping"
                                        checked={formData.permissionRequired.includes('landscaping')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Landscaping
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="permissionRequired"
                                        value="installingSheds"
                                        checked={formData.permissionRequired.includes('installingSheds')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Installing sheds or outbuildings
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="permissionRequired"
                                        value="walkingOnPipeline"
                                        checked={formData.permissionRequired.includes('walkingOnPipeline')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Walking on the pipeline prescribed area
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="permissionRequired"
                                        value="drivingOnPipeline"
                                        checked={formData.permissionRequired.includes('drivingOnPipeline')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Driving on the pipeline prescribed area
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="permissionRequired"
                                        value="agriculturalActivities"
                                        checked={formData.permissionRequired.includes('agriculturalActivities')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Agricultural activities like plowing and deep tilling
                                </label>
                            </div>
                        </div>

                        <div className="question">
                            <p>6. Which of the following is true regarding pipeline markers?</p>
                            <div className="options">
                                <label>
                                    <input
                                        type="radio"
                                        name="pipelineMarkers"
                                        value="productType"
                                        checked={formData.pipelineMarkers === 'productType'}
                                        onChange={handleChange}
                                    />
                                    Pipeline markers indicate what type of product is being carried by the pipeline
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="pipelineMarkers"
                                        value="locationAndDepth"
                                        checked={formData.pipelineMarkers === 'locationAndDepth'}
                                        onChange={handleChange}
                                    />
                                    Pipeline markers indicate the specific location and depth of the pipeline
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="pipelineMarkers"
                                        value="bothTrue"
                                        checked={formData.pipelineMarkers === 'bothTrue'}
                                        onChange={handleChange}
                                    />
                                    Both of these are true
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="pipelineMarkers"
                                        value="neitherTrue"
                                        checked={formData.pipelineMarkers === 'neitherTrue'}
                                        onChange={handleChange}
                                    />
                                    Neither of these are true
                                </label>
                            </div>
                        </div>

                        <div className="question">
                            <p>7. Before digging on this property, what is the first thing you would do to determine whether underground facilities, like pipelines or electrical lines, exist?</p>
                            <div className="options">
                                <label>
                                    <input
                                        type="radio"
                                        name="diggingProcedure"
                                        value="oneCall"
                                        checked={formData.diggingProcedure === 'oneCall'}
                                        onChange={handleChange}
                                    />
                                    Contact your provincial One-Call (via telephone or through the Click Before You Dig website)
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="diggingProcedure"
                                        value="pipelineOperator"
                                        checked={formData.diggingProcedure === 'pipelineOperator'}
                                        onChange={handleChange}
                                    />
                                    Contact the pipeline operator
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="diggingProcedure"
                                        value="localGovernment"
                                        checked={formData.diggingProcedure === 'localGovernment'}
                                        onChange={handleChange}
                                    />
                                    Contact the local government office
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="diggingProcedure"
                                        value="pipelineMarkers"
                                        checked={formData.diggingProcedure === 'pipelineMarkers'}
                                        onChange={handleChange}
                                    />
                                    Look to see if there are pipeline markers in the area
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="diggingProcedure"
                                        value="notDo"
                                        checked={formData.diggingProcedure === 'notDo'}
                                        onChange={handleChange}
                                    />
                                    Would not do any of these things
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="diggingProcedure"
                                        value="notSure"
                                        checked={formData.diggingProcedure === 'notSure'}
                                        onChange={handleChange}
                                    />
                                    Don't know/ Not sure
                                </label>
                            </div>
                        </div>

                        <div className="question">
                            <p>8. Before today, had you heard of One-Call/Call or Click Before You Dig?</p>
                            <div className="options">
                                <label>
                                    <input
                                        type="radio"
                                        name="heardOfOneCall"
                                        value="yes"
                                        checked={formData.heardOfOneCall === 'yes'}
                                        onChange={handleChange}
                                    />
                                    Yes, I had heard of it
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="heardOfOneCall"
                                        value="no"
                                        checked={formData.heardOfOneCall === 'no'}
                                        onChange={handleChange}
                                    />
                                    No, I had not heard of it
                                </label>
                            </div>
                        </div>

                        <div className="question">
                            <p>9. If you had heard of One-Call/Call or Click Before You Dig, when was the last time you used the One-Call system?</p>
                            <div className="options">
                                <label>
                                    <input
                                        type="radio"
                                        name="lastUsedOneCall"
                                        value="within6months"
                                        checked={formData.lastUsedOneCall === 'within6months'}
                                        onChange={handleChange}
                                    />
                                    Within the last 6 months
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="lastUsedOneCall"
                                        value="within12months"
                                        checked={formData.lastUsedOneCall === 'within12months'}
                                        onChange={handleChange}
                                    />
                                    Within the last 12 months
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="lastUsedOneCall"
                                        value="within2years"
                                        checked={formData.lastUsedOneCall === 'within2years'}
                                        onChange={handleChange}
                                    />
                                    Within the last 2 years
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="lastUsedOneCall"
                                        value="never"
                                        checked={formData.lastUsedOneCall === 'never'}
                                        onChange={handleChange}
                                    />
                                    Never used One-Call
                                </label>
                            </div>
                        </div>

                        <div className='survey-footer'>
                            <button onClick={toggle} className='active-button'>Close</button>
                            {isFormDataValid(formData) ? <button type="submit" className='active-button' onClick={() => handleSubmit(formData)}>Submit</button> : <button className='inactive-button'>Submit</button>}
                        </div>

                    </form>
                </div>



            </div>

        </div>

    );
};

export default Survey;
