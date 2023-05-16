import axios from 'axios';
import { useEffect, useState } from 'react';
import './Logs.scss';
import * as XLSX from 'xlsx'
import { FileSaver, fileType, saveAs } from 'file-saver'

function Logs() {

    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [user, setUser] = useState([]);
    const [userFilter, setUserFilter] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/Logs/get`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/users`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setUser(response.data));
    }, []);

    function FilterLogs(log) {
        if (compareDate(log.date)) {
            if (compareUser(log.user)) {
                return true;
            }
        }
        return false
    }

    function createReport(arr) {

        var test = [];

        for (let index = 0; index < arr.length; index++) {
            if (FilterLogs(arr[index])) {
                test.push(arr[index]);
            }
        }

        return test;

    }

    const Export = (arr) => {
        const ws = XLSX.utils.json_to_sheet(arr);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, 'test.xlsx');
    };

    function compareDate(logDate) {
        if (date === '') {
            return true
        }

        if (logDate === date) {
            return true;
        } else {
            return false;
        }
    }

    function compareUser(logUser) {
        if (userFilter === null) {
            return true
        }

        if (userFilter === logUser) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='log-container'>
            <>
                <input type="date" id="start" name="trip-start" onChange={(e) => setDate(e.target.value)}></input>
                <select defaultValue={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
                    <option value={null}>All</option>
                    {user.map((user, index) => {
                        return <option key={index} value={user.username}>{user.username}</option>
                    })}
                </select>
            </>
            <button onClick={() => { Export(createReport(data)) }}>Download</button>

            <div className='log-wrapper'>
                {data.map((log, index) => {
                    let change = log.changes.split('\n');
                    change.pop();

                    if (FilterLogs(log))
                        return (
                            <div className='log-item'>
                                <div className='log-header'>
                                    <h2>{log.user}</h2>
                                    <h3>{log.date}</h3>
                                    <a>{log.info}</a>
                                </div>
                                <ul>
                                    {change.map((record, index) => {
                                        let part = record.split(' >> ');
                                        return (
                                            <li>
                                                <div className='item-wrapper'><h3>{part[0]}:</h3></div>
                                                <div className='info-wrapper'><h4>From</h4><a>{part[1]}</a></div>
                                                <div className='info-wrapper'><h4>To</h4><a>{part[2]}</a></div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                })}
            </div>
        </div>
    )
}

export default Logs