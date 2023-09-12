import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Relations.scss';

import { MdMail } from 'react-icons/md';
import { FaHome, FaPhone, FaTruck, FaUserAlt } from 'react-icons/fa';

function Relations({ Stakeholder }) {
    const [data, setData] = useState([]);
    const project = Cookies.get('project');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/connections/${Stakeholder}/${project}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => {
            setData(response.data);
        });
    }, [Stakeholder, project]);

    return (
        <div className='relations-container'>
            <div className='column-header'>
                <h3>Connections</h3>
                <FaUserAlt />
            </div>
            {data.length === 0 ? <p>No Connections Found</p> : 
                        <ul className='relation-wrapper'>
                        {data.map((record, index) => (
                            <Link key={index} className='link' onClick={() => window.scrollTo(0, 0)} to={`/${record.stakeholder.NAME}`} state={{ stakeholder: record.stakeholder }}>
                                <div className='stakeholder-item'>
                                    <h3>{record.stakeholder.NAME}</h3>
        
                                    {record.phone && (
                                        <div className='info-wrapper'>
                                            <ag>Matching Number/s</ag>
                                            <a>{record.stakeholder.PHONE}</a>
                                        </div>
                                    )}
                                    {record.address && (
                                        <div className='info-wrapper'>
                                            <ag>Matching Mailing Address</ag>
                                            <a>{record.stakeholder.MAILING}</a>
                                        </div>
                                    )}
                                    {record.street && (
                                        <div className='info-wrapper'>
                                            <ag>Matching Street Address</ag>
                                            <a>{record.stakeholder.STREET}</a>
                                        </div>
                                    )}
                                    {record.delivery && (
                                        <div className='info-wrapper'>
                                            <ag>Matching Delivery Location</ag>
                                            <a>{record.stakeholder.LOCATION}</a>
                                        </div>
                                    )}
                                    {record.name && (
                                        <div className='info-wrapper'>
                                            <ag>Similar Name</ag>
                                            <a>{record.name}</a>
                                        </div>
                                    )}
                                    <ul className='missing-info-list'>
                                        {record.stakeholder.STREET === "" ? <li>MISSING STREET ADDRESS</li> : null}
                                        {record.stakeholder.MAILING === "" ? <li>MISSING MAILING ADDRESS</li> : null}
                                        {record.stakeholder.PHONE === "" ? <li>MISSING PHONE NUMBER</li> : null}
                                    </ul>
        
                                </div>
                            </Link>
                        ))}
                    </ul>
            }

        </div>
    );
}

export default Relations;
