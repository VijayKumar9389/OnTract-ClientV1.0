import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import './TractTable.scss';

function TractRow({ Stakeholder, stakeholderProfile, Index }) {

    const nav = useNavigate();

    const [newStructure, setNewnewStructure] = useState(Stakeholder.STRUCTURE_TYPE);
    const [newStatus, setNewStatus] = useState(Stakeholder.INTEREST);
    const [newOccupants, setNewOccupants] = useState(Stakeholder.OCCUPANTS);
    const [newWorksLand, setnewWorksLand] = useState(Stakeholder.WORKED);
    const [newComments, setNewComments] = useState(Stakeholder.COMMENTS);
    const project = Cookies.get('project');

    const pin = Stakeholder.PIN.split("/");

    const Update = (id) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/update/${project}`,
            {
                ID: id,
                STRUCTURE_TYPE: newStructure,
                INTEREST: newStatus,
                OCCUPANTS: newOccupants,
                WORKED: newWorksLand,
                COMMENTS: newComments
            }, {
            headers: { "access-token": localStorage.getItem("access-token") }
        })
            .then(
                (response) => {
                    successtoast("Successfully Updated Tract " + Stakeholder.TRACT + " for " + Stakeholder.NAME);
                }
            );
    }

    function selectStakeholder(stakeholderInfo) {
        window.scrollTo(0, 0);
        nav(`/${stakeholderInfo.NAME}`, {
            state: {
                stakeholder: stakeholderInfo
            }
        });
    }

    function successtoast(name) {
        toast.success(name, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <li className='tract-row'>

            <div className='name-wrapper'>
                {Index === 0 ? <h4 style={{ backgroundColor: '#FFFF00' }} >{Stakeholder.NAME}</h4> : <h4>{Stakeholder.NAME}</h4>}
                <label>{Stakeholder.INTEREST}</label>

                {Index === 0
                    ? null
                    : <ul className='missing-info-list'>
                        {Stakeholder.STREET === "" ? <li>MISSING STREET ADDRESS</li> : null}
                        {Stakeholder.MAILING === "" ? <li>MISSING MAILING ADDRESS</li> : null}
                        {Stakeholder.PHONE === "" ? <li>MISSING PHONE NUMBER</li> : null}
                    </ul>}
            </div>

            <div className='wrapper'>
                <label>Occupants:</label>
                <textarea maxLength={50} defaultValue={Stakeholder.OCCUPANTS} onChange={(event) => setNewOccupants(event.target.value)}></textarea>
            </div>


            <div className='wrapper'>
                <label>Works land:</label>
                <select defaultValue={Stakeholder.WORKED} onChange={(event) => setnewWorksLand(event.target.value)}>
                    <option value="">N/A</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
            </div>


            <div className='wrapper'>
                <label>Structure:</label>
                <textarea maxLength={250} className='structure' defaultValue={Stakeholder.STRUCTURE_TYPE} onChange={(event) => setNewnewStructure(event.target.value)}></textarea>
            </div>


            <div className='wrapper'>
                <label>Comments:</label>
                <textarea maxLength={200} className='comment' defaultValue={Stakeholder.COMMENTS} onChange={(event) => setNewComments(event.target.value)}></textarea>
            </div>


            <div className='tract-btn-container'>
                <button onClick={() => Update(Stakeholder.ID)}> SAVE</button>
                {Index === 0 ? null : <button onClick={() => selectStakeholder(Stakeholder)}>VIEW</button>}
            </div>

            {/* <div class="button-grid">
                <button class="view-button">View</button>
                <button class="save-button">Save</button>
                <button class="related-button">Related</button>
            </div> */}

        </li>
    );
}

export default TractRow;