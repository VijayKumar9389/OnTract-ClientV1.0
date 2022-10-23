import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Relations.scss';

import { FaHome } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

const colors = [
    "#ADFF2F",
    "#7FFF00",
    "#7CFC00",
    "#00FF00",
    "#32CD32",
    "#98FB98",
    "#00FA9A",
    "#00FF7F",
    "#3CB371",
    "#2E8B57",
    "#228B22",
    "#008000",
    "#006400",
    "#9ACD32",
    "#6B8E23",
    "#556B2F",
    "#66CDAA",
    "#8FBC8F",
    "#20B2AA",
    "#008B8B",
    "#008080",
    "#00FFFF",
    "#00FFFF",
    "#7FFFD4"
];

var randomColor = Math.floor(Math.random() * 16777215).toString(16);

function Relations({ Stakeholder }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/connections/` + Stakeholder, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => {
            setData(response.data)
        })

    }, [Stakeholder]);

    return (
        <div className='relations-container'>
            <h3>Connections</h3>
            <ul>
                {data.map((record, index) => {
                    return (
                        <Link key={index} className='link' onClick={() => window.scrollTo(0, 0)} to={`/${record.stakeholder.NAME}`} state={{ stakeholder: record.stakeholder }}>
                            <li>
                                <h3>{record.stakeholder.NAME}</h3>
                                <div className='info-wrapper'>
                                    <FaPhone size='1.2rem' />
                                    {record.phone ? <a>{record.stakeholder.PHONE}</a> : <a></a>}
                                </div>
                                <div className='info-wrapper'>
                                    <MdMail size='1.2rem' />
                                    {record.address ? <a>{record.stakeholder.MAILING}</a> : <a></a>}
                                </div>
                                <div className='info-wrapper'>
                                    <FaHome size='1.2rem' />
                                    {record.street ? <a>{record.stakeholder.STREET}</a> : <a></a>}
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

export default Relations;