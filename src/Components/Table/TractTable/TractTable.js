import { useEffect, useState } from 'react';
import axios from 'axios';

import './TractTable.scss';

import TractRow from './TractRow';

function TractTable({ Stakeholder }) {

    const [data, setData] = useState([]);
    const [searchTable, setSearchTable] = useState(false);
    const [allStakeholders, setAllStakeholders] = useState([]);
    const [search, setSearch] = useState("");
    const [btnClearSearch, setbtnClearSearch] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/cluster/` + Stakeholder, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setAllStakeholders(response.data));
    }, [Stakeholder]);

    function PrintRow(arr, ind) {

        const pin = arr[0].PIN.split("/");

        return (
            <>
                {ind > 0 ? <div className='blank-space'></div> : null}
                {arr.map((stakeholder, index) => {
                    return <TractRow key={stakeholder.ID} Index={index} Stakeholder={stakeholder} stakeholderProfile={checkStakeholder(stakeholder.NAME)} />
                })}
            </>
        )
    }

    function checkStakeholder(name) {
        if (Stakeholder === name) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <div className='tract-table-container'>
                <table className='tract-table'>
                    <thead>
                        <tr>
                            <th><h5>Tract</h5></th>
                            <th><h5>Structure</h5></th>
                            <th><h5>Name</h5></th>
                            <th><h5>Status</h5></th>
                            <th><h5>Occupants</h5></th>
                            <th><h5>Works Land</h5></th>
                            <th><h5>Commodity</h5></th>
                            <th><h5>Pipeline Status</h5></th>
                            <th><h5>Comment</h5></th>
                            <th><h5>Manage</h5></th>
                            <th><h5></h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((stakeholder, index) => {
                            return PrintRow(stakeholder, index)
                        })}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default TractTable;