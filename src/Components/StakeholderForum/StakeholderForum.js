import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { BsArrowLeftShort } from "react-icons/bs";

import './StakeholderForum.scss';
import { FaUserAlt } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im';
import { FaTruckMoving } from 'react-icons/fa';
import { BsChatLeftTextFill } from 'react-icons/bs';

import Relations from '../Relations/Relations';
import Survey from '../Survey/Survey';

function StakeholderForum({ Stakeholder }) {

    const [data, setData] = useState([]);

    const [newName, setNewName] = useState('');
    const [newContactStatus, setNewContactStatus] = useState('');
    const [newHomeAddress, setNewHomeAddress] = useState('');
    const [newMailingAddress, setNewMailingAddress] = useState('');
    const [newPhoneNo, setNewPhoneNo] = useState('');
    const [newContacted, setNewContacted] = useState('');
    const [newAttemptDetails, setNewAttemptDetails] = useState('');
    const [newConsultationDate, setNewConsultationDate] = useState('');
    const [newFollowUp, setNewFollowUp] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newStakeholderComment, setNewStakeholderComment] = useState('');
    const [newCorperation, setNewCorperation] = useState('');
    const [newRoute, setNewRoute] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const project = Cookies.get('project');

    const [isOpen, setIsOpen] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        getSurvey();
    }, []);

    async function getSurvey() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/survey/get/${Stakeholder.NAME}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));
    }

    const Update = (name) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/update/${project}`,
            {
                NAME: name,
                NEWNAME: newName.trim(),
                CONTACTSTATUS: newContactStatus.trim(),
                STREET: newHomeAddress.trim(),
                MAILING: newMailingAddress.trim(),
                PHONE: newPhoneNo.trim(),
                CONTACTED: newContacted.trim(),
                ATTEMPTS: newAttemptDetails.trim(),
                CONSULTATION: newConsultationDate.trim(),
                FOLLOWUP: newFollowUp.trim(),
                EMAIL: newEmail,
                STAKEHOLDERCOMMENT: newStakeholderComment,
                CORPERATION: newCorperation,
                ROUTE: newRoute,
                LOCATION: newLocation
            }, {
            headers: { "access-token": localStorage.getItem("access-token") }
        }).then((response) => {
            console.log(response)
            if (!response.data.status) {
                failtoast(name);
            } else {
                successtoast(name);
                log(name);
                navigate(`/${newName}`, {
                    replace: true,
                    state: {
                        stakeholder: {
                            NAME: newName.trim(),
                            CONTACT: newContactStatus.trim(),
                            STREET: newHomeAddress.trim(),
                            MAILING: newMailingAddress.trim(),
                            PHONE: newPhoneNo.trim(),
                            CONTACTED: newContacted.trim(),
                            ATTEMPTS: newAttemptDetails.trim(),
                            CONSULTATION: newConsultationDate.trim(),
                            FOLLOWUP: newFollowUp.trim(),
                            EMAIL: newEmail.trim(),
                            STAKEHOLDERCOMMENT: newStakeholderComment.trim(),
                            CORPERATION: newCorperation.trim(),
                            ROUTE: newRoute.trim(),
                            LOCATION: newLocation.trim()
                        }
                    }
                });
            }
        });
    }

    function toggle() {
        setIsOpen(!isOpen)
        getSurvey();
    }

    function log(name) {

        let date = new Date();
        let today = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");

        if (checkChanges().length !== 0) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/logs/create`,
                {
                    info: name,
                    user: 'Test',
                    date: today,
                    changes: checkChanges(),
                }, {
                headers: { "access-token": localStorage.getItem("access-token") }
            }).then((response) => {
                console.log(response);
            });
        }
    }

    function successtoast(name) {
        toast.success(`Successfully updated ${name}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function surveytoast(name) {
        toast.success(`Successfully submitted survey for ${name}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function failtoast(name) {
        toast.error(`Failed to updated ${name}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function checkChanges() {

        var arr = '';

        if (Stakeholder.NAME !== newName) arr = arr + 'Name' + ' >> ' + Stakeholder.NAME + ' >> ' + newName + '\n';
        if (Stakeholder.CONTACT !== newContactStatus) arr = arr + 'Contact' + ' >> ' + Stakeholder.CONTACT + ' >> ' + newContactStatus + '\n';
        if (Stakeholder.STREET !== newHomeAddress) arr = arr + 'Street' + ' >> ' + Stakeholder.STREET + ' >> ' + newHomeAddress + '\n';
        if (Stakeholder.MAILING !== newMailingAddress) arr = arr + 'Mailing' + ' >> ' + Stakeholder.MAILING + ' >> ' + newMailingAddress + '\n';
        if (Stakeholder.PHONE !== newPhoneNo) arr = arr + 'Phone No' + ' >> ' + Stakeholder.PHONE + ' >> ' + newPhoneNo + '\n';
        if (Stakeholder.CONTACTED !== newContacted) arr = arr + 'Contacted' + ' >> ' + Stakeholder.CONTACTED + ' >> ' + newContacted + '\n';
        if (Stakeholder.ATTEMPTS !== newAttemptDetails) arr = arr + 'Attempts' + ' >> ' + Stakeholder.ATTEMPTS + ' >> ' + newAttemptDetails + '\n';
        if (Stakeholder.CONSULTATION !== newConsultationDate) arr = arr + 'Consultation' + ' >> ' + Stakeholder.CONSULTATION + ' >> ' + newConsultationDate + '\n';
        if (Stakeholder.FOLLOWUP !== newFollowUp) arr = arr + 'Follow Up' + ' >> ' + Stakeholder.FOLLOWUP + ' >> ' + newFollowUp + '\n';
        if (Stakeholder.EMAIL !== newEmail) arr = arr + 'Email' + ' >> ' + Stakeholder.EMAIL + '' + ' >> ' + ' >> ' + newEmail + '\n';
        if (Stakeholder.STAKEHOLDERCOMMENT !== newStakeholderComment) arr = arr + 'Delivery Comment' + ' >> ' + Stakeholder.STAKEHOLDERCOMMENT + ' >> ' + newStakeholderComment + '\n';
        if (Stakeholder.CORPERATION !== newCorperation) arr = arr + 'Corperation' + ' >> ' + Stakeholder.CORPERATION + ' >> ' + newCorperation + '\n';
        if (Stakeholder.ROUTE !== newRoute) arr = arr + 'Route' + ' >> ' + Stakeholder.ROUTE + ' >> ' + newRoute + '\n';
        if (Stakeholder.LOCATION !== newLocation) arr = arr + 'Location' + ' >> ' + Stakeholder.LOCATION + ' >> ' + newLocation + '\n';

        return arr;

    }

    function addAttempt() {

        let date = new Date();
        let today = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear();

        if (document.getElementById('attempt-txt').value !== '') {
            today = ", " + date.getDate() + "/" + ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
        } else {
            today = date.getDate() + "/" + ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
        }

        setNewAttemptDetails(document.getElementById('attempt-txt').value + today);
        document.getElementById('attempt-txt').value = document.getElementById('attempt-txt').value + today;
    }

    function stampDate() {
        let date = new Date();
        let today = date.getDate() + "/" + ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();

        setNewConsultationDate(today);
        document.getElementById('consultation-txt').value = today;
    }

    useEffect(() => {
        setNewName(Stakeholder.NAME);
        setNewContactStatus(Stakeholder.CONTACT);
        setNewMailingAddress(Stakeholder.MAILING);
        setNewHomeAddress(Stakeholder.STREET);
        setNewPhoneNo(Stakeholder.PHONE);
        setNewContacted(Stakeholder.CONTACTED);
        setNewAttemptDetails(Stakeholder.ATTEMPTS);
        setNewConsultationDate(Stakeholder.CONSULTATION);
        setNewFollowUp(Stakeholder.FOLLOWUP);
        setNewEmail(Stakeholder.EMAIL);
        setNewStakeholderComment(Stakeholder.STAKEHOLDERCOMMENT);
        setNewCorperation(Stakeholder.CORPERATION);
        setNewRoute(Stakeholder.ROUTE);
        setNewLocation(Stakeholder.LOCATION);
    }, [Stakeholder]);

    return (
        <div className='forum-container'>

            <Survey Stakeholder={Stakeholder} isOpen={isOpen} toggle={() => toggle()} triggerSurveyToast={surveytoast} />


            <div className='heading'>
                <Link className='link' to='/'><BsArrowLeftShort size='2rem' /></Link><h3>{Stakeholder.NAME}</h3>
                <div className='btn-wrapper'>
                    {/* {console.log(data)}
                    {data.length === 0 ? <p>Survey Incomplete</p> : <p>Survey Completed</p>} */}
                    <button
                        className="survey"
                        onClick={() => window.open('https://www.surveymonkey.com/r/M92XXPP', '_blank')}
                    >
                        Survey (Ontario 2023)
                    </button>

                    {checkChanges() === '' ? (
                        <button className="save-inactive" >Save</button>
                    ) : (
                        <button className="save" onClick={() => { Update(Stakeholder.NAME) }}>Save</button>
                    )}
                </div>
            </div>

            <div className='forum-wrapper'>

                <div className='stakeholder-column'>
                    <div className='column-header'><h3>General</h3><FaUserAlt /></div>

                    <div className='input-container-column'>
                        <div className='input-wrapper'>
                            <label>Name</label>
                            <textarea maxLength={150} type="text" value={newName} onChange={(event) => setNewName(event.target.value)}></textarea>
                        </div>
                        <div className='input-wrapper'>
                            <label>Stakeholder Comment</label>
                            <textarea maxLength={255} type="text" value={newStakeholderComment} onChange={(event) => setNewStakeholderComment(event.target.value)}></textarea>
                        </div>
                    </div>


                    <div className="input-container-column">
                        <div className="input-wrapper">
                            <label>Status:</label>
                            <select value={newContactStatus} onChange={(event) => setNewContactStatus(event.target.value)}>
                                <option value="GREEN">GREEN</option>
                                <option value="YELLOW">YELLOW</option>
                                <option value="RED">RED</option>
                            </select>
                        </div>

                        <div className="input-wrapper">
                            <label>Corporation:</label>
                            <select value={newCorperation} onChange={(event) => setNewCorperation(event.target.value)}>
                                <option value="">N/A</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='column-wrapper'>
                    <div className='location-column'>
                        <div className='column-header'><h3>Location</h3><ImLocation2 /></div>
                        <div className='input-container-single'>
                            <div className='input-wrapper'>
                                <label>Home Address</label>
                                <textarea maxLength={150} type="text" value={newHomeAddress} onChange={(event) => setNewHomeAddress(event.target.value)}></textarea>
                            </div>
                            <div className='input-wrapper'>
                                <label>Mailing Address</label>
                                <textarea maxLength={150} type="text" value={newMailingAddress} onChange={(event) => setNewMailingAddress(event.target.value)}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className='contact-column'>
                        <div className='column-header'><h3>Contact</h3><BsChatLeftTextFill /></div>
                        <div className='input-container-single'>
                            <div className='input-wrapper'>
                                <label>Phone No.</label>
                                <textarea maxLength={300} type="text" value={newPhoneNo} onChange={(event) => setNewPhoneNo(event.target.value)}></textarea>
                            </div>
                            <div className='input-wrapper'>
                                <label>Email</label>
                                <input maxLength={50} type="text" value={newEmail} onChange={(event) => setNewEmail(event.target.value)}></input>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='column-wrapper'>
                    <div className='consultation-column'>
                        <div className='column-header'><h3>Consultation</h3><BsChatLeftTextFill /></div>
                        <div className='input-container-single'>
                            <div className='input-wrapper'>
                                <div className='label-wrapper'><label>Consultation Date</label><button className='attempt' onClick={() => stampDate()}>+ Add</button></div>
                                <input maxLength={50} id='consultation-txt' type="text" value={newConsultationDate} onChange={(event) => setNewConsultationDate(event.target.value)}></input>
                            </div>
                            <div className='input-wrapper'>
                                <div className='label-wrapper'><label>Attempt Details</label><button className='attempt' onClick={() => addAttempt()}>+ Add</button></div>
                                <input maxLength={255} id='attempt-txt' type="text" value={newAttemptDetails} onChange={(event) => setNewAttemptDetails(event.target.value)}></input>
                            </div>
                            <div className="input-wrapper">
                                <label>Contacted:</label>
                                <select value={newContacted} onChange={(event) => setNewContacted(event.target.value)}>
                                    <option value="">N/A</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className='delivery-column'>
                        <div className='column-header'><h3>Delivery</h3><FaTruckMoving /></div>
                        <div className='input-container-single'>
                            <div className='input-wrapper'>
                                <div className='label-wrapper'><label>Route: (For grouping deliveries)</label></div>
                                <input maxLength={255} type="text" value={newRoute} onChange={(event) => setNewRoute(event.target.value)}></input>
                            </div>
                            <div className='input-wrapper'>
                                <label>Location: (For the exact drop off/mail out location)</label>
                                <input maxLength={255} type="text" value={newLocation} onChange={(event) => setNewLocation(event.target.value)}></input>
                            </div>
                            <div className='input-wrapper'>
                                <label>Follow Up</label>
                                <input maxLength={50} type="text" value={newFollowUp} onChange={(event) => setNewFollowUp(event.target.value)}></input>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            <Relations Stakeholder={Stakeholder.NAME} />
        </div>
    );
}

export default StakeholderForum;
