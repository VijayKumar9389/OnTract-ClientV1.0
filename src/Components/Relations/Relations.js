import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Relations.scss';

import { FaHome } from 'react-icons/fa';
import { FaPhone, FaTruck } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

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
const project = Cookies.get('project');


function Relations({ Stakeholder }) {

    const [data, setData] = useState([]);
    const [relations, setRelations] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/connections/${Stakeholder}/${project}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => {
            setData(response.data)
        });
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/relations/${Stakeholder}/${project}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => {
            setRelations(response.data)
        });
    }, [Stakeholder, project]);

    return (
        <div className='relations-container'>
            <div className='column-header'><h3>Connections</h3><FaUserAlt /></div>
            <div className='relation-wrapper'>
                    {relations.map((relation, index) => {
                        return (
                            <Link key={index} className='link' onClick={() => window.scrollTo(0, 0)} to={`/${relation.NAME}`} state={{ stakeholder: relation }}>
                                <li key={index} className='stakeholder-item'>
                                    <h3>{relation.NAME}</h3>
                                    <div className='info-wrapper'>
                                        <a>Similar Name</a>
                                    </div>
                                    </li>  
                                </Link>
                        );
                    })}

                    {data.map((record, index) => {
                        return (
                            <Link key={index} className='link' onClick={() => window.scrollTo(0, 0)} to={`/${record.stakeholder.NAME}`} state={{ stakeholder: record.stakeholder }}>
                                <li className='stakeholder-item'>
                                    <h3>{record.stakeholder.NAME}</h3>
                                    {record.phone && (
                                        <div className='info-wrapper'>
                                            <FaPhone className="icon" />
                                            <a>{record.stakeholder.PHONE}</a>
                                        </div>
                                    )}

                                    {record.address && (
                                        <div className='info-wrapper'>
                                            <MdMail className="icon" />
                                            <a>{record.stakeholder.MAILING}</a>
                                        </div>
                                    )}

                                    {record.street && (
                                        <div className='info-wrapper'>
                                            <FaHome className="icon" />
                                            <a>{record.stakeholder.STREET}</a>
                                        </div>
                                    )}
                                    {record.delivery && (
                                        <div className='info-wrapper'>
                                            <FaTruck className="icon" />
                                            <a>{record.stakeholder.LOCATION}</a>
                                        </div>
                                    )}

                                </li>
                            </Link>
                        );
                    })}
            </div>

        </div>
    );
}

export default Relations;