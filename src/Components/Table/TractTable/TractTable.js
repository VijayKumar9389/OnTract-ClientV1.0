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

        // const pin = arr[0].PIN.split("/");

        return (
            <div className='tract-table'>
                <div className='tract-header'>
                    <a><h2>{arr[0].TRACT}</h2></a>
                    <div className='tract'>
                        <a>Lot: {arr[0].PIN}</a>
                        <h5>Comodity: {arr[0].COMMODITY}</h5>
                        <h5>Pipline: {arr[0].PIPLINESTATUS}</h5>
                    </div>
                </div>
                <ul>
                    {arr.map((stakeholder, index) => {
                        return <TractRow key={stakeholder.ID} Index={index} Stakeholder={stakeholder} stakeholderProfile={checkStakeholder(stakeholder.NAME)} />
                    })}
                </ul>
            </div>
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
                {data.map((stakeholder, index) => {
                    return PrintRow(stakeholder, index)
                })}
            </div>
        </>

    );
}

export default TractTable;