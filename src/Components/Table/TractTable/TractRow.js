import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './TractTable.scss';

function TractRow({ Stakeholder, stakeholderProfile, Index }) {

    const nav = useNavigate();

    const [newStructure, setNewnewStructure] = useState(Stakeholder.STRUCTURE_TYPE);
    const [newStatus, setNewStatus] = useState(Stakeholder.INTEREST);
    const [newOccupants, setNewOccupants] = useState(Stakeholder.OCCUPANTS);
    const [newWorksLand, setnewWorksLand] = useState(Stakeholder.WORKED);
    const [newComments, setNewComments] = useState(Stakeholder.COMMENTS);

    const pin = Stakeholder.PIN.split("/");

    const Update = (id) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/update`,
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
        <tr>
            <td className='tract'>
                <a><h2>{Stakeholder.TRACT}</h2></a>
                <a>{pin[1]}</a>
            </td>
            <td><textarea className='structure' defaultValue={Stakeholder.STRUCTURE_TYPE} onChange={(event) => setNewnewStructure(event.target.value)}></textarea></td>
            <td className='name-cell'>{Stakeholder.NAME}</td>
            <td><div className={Index === 0 ? 'highlight' : ''}>{Stakeholder.INTEREST}</div></td>
            <td><input defaultValue={Stakeholder.OCCUPANTS} onChange={(event) => setNewOccupants(event.target.value)}></input></td>
            <td>
                <select defaultValue={Stakeholder.WORKED} onChange={(event) => setnewWorksLand(event.target.value)}>
                    <option value="">N/A</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
            </td>
            <td>{Stakeholder.COMMODITY}</td>
            <td>{Stakeholder.PIPLINESTATUS}</td>
            <td><textarea className='comment' defaultValue={Stakeholder.COMMENTS} onChange={(event) => setNewComments(event.target.value)}></textarea></td>
            <td><button onClick={() => Update(Stakeholder.ID)}> SAVE</button></td>
            <td>{stakeholderProfile ? null : <button onClick={() => selectStakeholder(Stakeholder)}>VIEW</button>}</td>
        </tr>
    );
}

export default TractRow;