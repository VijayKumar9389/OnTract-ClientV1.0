import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseSharp } from 'react-icons/io5';
import Cookies from 'js-cookie';
import axios from 'axios';

import './ProjectTable.scss';

function ProjectTable({ isOpen, toggle }) {
    // State Hooks
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAll`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setProjects(response.data));
    }, []);

    const setCookie = (project) => {
        Cookies.set('project', project);
        window.location.reload();
    }

    if (isOpen) return (
        <div className='select-container'>
            {console.log(projects)}
            <div className='select-background' onClick={toggle} ></div>
            <div className='project-popup'>
                <div className='popup-header'>
                    <h2>Select Project</h2>
                    <button >
                        <IoCloseSharp className='icon' onClick={toggle}/>
                    </button>
                </div>
                <div className='project-table-body'>
                    {projects.length === 0 ? (
                        <div className='no-data-message'>No projects available.</div>
                    ) : (
                        <table className='address-tbl'>
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => {
                                    let details = project.split('_');
                                    return (
                                        <tr key={index} onClick={() => setCookie(project)}>
                                            <td>{details[0]}</td>
                                            <td>{details[1]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );


}

export default ProjectTable;
