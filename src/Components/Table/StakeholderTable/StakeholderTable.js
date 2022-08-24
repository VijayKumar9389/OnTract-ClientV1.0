import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { checkLocation, searchName, checkTableFilter, checkNum } from '../../../Helpers/utils';

import './StakeholderTable.scss';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { FaPhoneSlash } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

function StakeholderTable() {

    const [data, setData] = useState([]);

    const nav = useNavigate();
    const tblSearch = useSelector((state) => state.filter.search.txt);
    const filters = useSelector((state) => state.filter.value);
    const Location = useSelector((state) => state.filter.location);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));
    }, []);

    function selectStakeholder(stakeholderInfo) {
        console.log(stakeholderInfo)
        window.scrollTo(0, 0);
        nav(`/${stakeholderInfo.NAME}`, {
            state: {
                stakeholder: stakeholderInfo
            }
        });
    }

    function Filter(stakeholder) {
        if (searchName(stakeholder.NAME.toLowerCase(), tblSearch)) {
            if (checkLocation(stakeholder.NAME, stakeholder.MAILING, Location)) {
                // if (checkTableFilter(filters, stakeholder)) {
                    return true;
                // }
            }
        }
        return false;
    }

    return (
        <div className='table-container'>
            <table className='stakeholder-table'>
                <thead>
                    <tr>
                        <th><h5>Name</h5></th>
                        <th><h5>Tracts</h5></th>
                        <th><h5>Contact Staus</h5></th>
                        <th><h5>Location</h5></th>
                        <th><h5>Attempts</h5></th>
                        <th><h5>Contacted</h5></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stakeholder, index) => {

                        let location = stakeholder.MAILING.split(",");

                        if (Filter(stakeholder)) {
                            return (
                                <tr key={index} onClick={() => selectStakeholder(stakeholder)}>
                                    <td className='name'>{stakeholder.NAME}</td>
                                    <td>{stakeholder.count}</td>
                                    <td>
                                        <div className='status-wrapper'>
                                            {checkNum(stakeholder.PHONE) ? <FaPhoneSlash size='1.5rem' color='grey' className='icon' /> : <FaPhone size='1.5rem' color='grey' className='icon' />}
                                            {stakeholder.CONTACT}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='status-wrapper'>
                                            <a>{location.length >= 3 ? location[location.length - 3] : 'MISSING'}</a>
                                            <a>{location.length >= 3 ? location[location.length - 2] : 'MISSING'}</a>
                                        </div>
                                    </td>
                                    <td>{stakeholder.ATTEMPTS}</td>
                                    <td>{stakeholder.CONTACTED === 'YES' ? <MdOutlineCheck size='2rem' color='grey' className='icon' /> : <MdOutlineClose size='2rem' color='grey' className='icon' />}</td>
                                    <td><MdKeyboardArrowRight size='1.5rem' color='grey' /></td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StakeholderTable;