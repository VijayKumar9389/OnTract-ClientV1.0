import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Filter, verifyCluster, serachTract, checkLocation } from '../../../Helpers/utils.js';

import './MasterTable.css';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import MasterRow from './MasterRow.js';

function MasterTable() {

    const [data, setData] = useState([]);
    const nav = useNavigate();
    const tblSearch = useSelector((state) => state.search.value);
    const Location = useSelector((state) => state.location.value);
    const tblFilter = useSelector((state) => state.filter.value);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/tractCluster`, {
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

    function checkTableFilter(arr) {
        switch (tblFilter) {
            default:
                return true;

            case 3:
                if (arr.length <= 1) {
                    return true;
                } else {
                    return false;
                }

            case 4:
                if (arr.length > 1) {
                    return true;
                } else {
                    return false;
                }
        }
    }

    function getContactStatus(contactStatus) {
        if (contactStatus === 'YES') {
            return true;
        } else {
            return false;
        }
    }
    function PrintRow(cluster, ind) {

        var tractNo = cluster[0].TRACT;

        if (serachTract(tractNo, tblSearch.txt)) {
            if (checkTableFilter(cluster)) {
                return (
                    <>
                        {ind > 0 || Number(tblSearch) === tractNo ? <div className='master-spacer'></div> : null}

                        {cluster.map((stakeholder, index) => {

                            let location = stakeholder.MAILING.split(",");

                            return (
                                <tr key={index} className={Filter(stakeholder, tblFilter) ? 'active-tr' : 'nonactive-tr'} onClick={() => selectStakeholder(stakeholder)}>
                                    <td>{stakeholder.TRACT}</td>
                                    <td>{stakeholder.NAME}</td>
                                    <td>{stakeholder.CONTACT}</td>
                                    <td>{location.length >= 3 ? location[location.length - 2] : 'MISSING'}</td>
                                    <td>{location.length >= 3 ? location[location.length - 3] : 'MISSING'}</td>
                                    <td>{stakeholder.ATTEMPTS}</td>
                                    <td>{getContactStatus(stakeholder.CONTACTED) ? <MdOutlineCheck size='2rem' color='#407945' /> : <MdOutlineClose size='2rem' color='#a4484c' />}</td>
                                    <td><MdKeyboardArrowRight size='1.5rem' color='grey' /></td>
                                </tr>
                            );
                        })}
                    </>
                );
            }
        }
    }

    return (
        <div className='table-container'>
            <table className='master-table'>
                <thead>
                    <tr>
                        <th><h5>Tracts</h5></th>
                        <th><h5>Name</h5></th>
                        <th><h5>Contact Staus</h5></th>
                        <th><h5>Province</h5></th>
                        <th><h5>City</h5></th>
                        <th><h5>Attempts</h5></th>
                        <th><h5>Contacted</h5></th>
                        <th>{tblSearch.txt}</th>
                    </tr>
                </thead>
                {console.log(data)}
                <tbody>
                    {data.map((cluster, index) => {
                        if (verifyCluster(cluster, tblFilter)) {
                            return <MasterRow key={index} index={index} stakeholders={cluster} />;
                        }
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default MasterTable;