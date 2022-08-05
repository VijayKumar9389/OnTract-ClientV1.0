import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { checkLocation, searchName, checkTableFilter } from '../../../Helpers/utils';

import './StakeholderTable.scss';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

function StakeholderTable() {

    const [data, setData] = useState([]);

    const nav = useNavigate();
    const tblSearch = useSelector((state) => state.search.value);
    const tblFilter = useSelector((state) => state.filter.value);
    const Location = useSelector((state) => state.location.value);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));
    }, []);

    function selectStakeholder(stakeholderInfo) {
        window.scrollTo(0, 0);
        nav(`/${stakeholderInfo.NAME}`, {
            state: {
                stakeholder: stakeholderInfo
            }
        });
    }

    function Filter(stakeholder) {
        if (searchName(stakeholder.NAME.toLowerCase(), tblSearch.txt)) {
            if (checkLocation(stakeholder.MAILING, Location)) {
                if (checkTableFilter(tblFilter, stakeholder)) {
                    return true;
                }
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
                        <th><h5>Province</h5></th>
                        <th><h5>City</h5></th>
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
                                    <td>{stakeholder.CONTACT}</td>
                                    <td>{location.length >= 3 ? location[location.length - 2] : 'MISSING'}</td>
                                    <td>{location.length >= 3 ? location[location.length - 3] : 'MISSING'}</td>
                                    <td>{stakeholder.ATTEMPTS}</td>
                                    <td>{stakeholder.CONTACTED === 'YES' ? <MdOutlineCheck size='2rem' color='grey' className='icon'/> : <MdOutlineClose size='2rem' color='grey' className='icon'/>}</td>
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