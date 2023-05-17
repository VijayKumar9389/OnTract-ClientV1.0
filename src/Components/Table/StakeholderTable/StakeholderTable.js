import axios from 'axios';
import * as XLSX from 'xlsx'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fileType, saveAs } from 'file-saver'

import { checkNum, Filter } from '../../../Helpers/utils';

import './StakeholderTable.scss';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { FaPhoneSlash } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { AiOutlineArrowUp } from "react-icons/ai";
import Input from '../../Input/Input';

function StakeholderTable() {

    const [data, setData] = useState([]);
    const nav = useNavigate();
    const tblFilter = useSelector((state) => state.filter);
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

    const Export = (arr) => {
        const ws = XLSX.utils.json_to_sheet(arr);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, 'test.xlsx');
    };

    function createReport(array, filters) {

        var stakeholders = [];

        for (let index = 0; index < array.length; index++) {
            if (Filter(array[index], filters)) {
                stakeholders.push(array[index]);
            }
        }

        return stakeholders;
    }

    if (data) return (
        <div className='table-container'>
            <label>Results: {createReport(data, tblFilter).length}</label>
            {/* <button onClick={() => Export(createReport(data, tblFilter))}>Download</button> */}
            <table className='stakeholder-tbl'>
                <thead>
                    <tr>
                        <th><h5>Name</h5></th>
                        <th><h5>Tracts</h5></th>
                        <th><h5>Contact Staus</h5></th>
                        <th><h5>Number</h5></th>
                        <th><h5>City</h5></th>
                        <th><h5>Province</h5></th>
                        <th><h5>Attempts</h5></th>
                        <th><h5>Contacted</h5></th>
                        <th></th>
                    </tr>
                </thead>
                <thead className='thead-input'>
                   <th className='th-input' colSpan={9}><Input /></th> 
                </thead>
                <tbody>
                    {data.map((stakeholder, index) => {

                        let location = stakeholder.MAILING.split(",");
                        let attemps = stakeholder.ATTEMPTS.split(",");

                        if (Filter(stakeholder, tblFilter)) {
                            return (
                                <tr key={index} onClick={() => selectStakeholder(stakeholder)}>
                                    <td className='name'>{stakeholder.NAME}</td>
                                    <td>{stakeholder.count}</td>
                                    <td>
                                        <div className='status-wrapper'>
                                            {stakeholder.CONTACT}
                                            {console.log(data)}
                                        </div>
                                    </td>
                                    <td>{checkNum(stakeholder.PHONE) ? <FaPhoneSlash size='1.5rem' color='grey' className='icon' /> : <FaPhone size='1.5rem' color='grey' className='icon' />}</td>
                                    <td><a>{location.length >= 3 ? location[location.length - 3] : 'MISSING'}</a>
                                           </td>
                                    <td> <a>{location.length >= 3 ? location[location.length - 2] : 'MISSING'}</a></td>
                                    <td>{attemps[0] !== '' ? attemps.length : 0}</td>
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