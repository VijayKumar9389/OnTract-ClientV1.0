import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './StakeholderTable.css';
import { BiX } from 'react-icons/bi'
import { CgSearch } from 'react-icons/cg'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

function StakeholderTable({ Location, Filters }) {

    const nav = useNavigate();

    const [data, setData] = useState([]);
    const [btnClearSearch, setbtnClearSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [contactFilter, setContactFilter] = useState('');

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

    function handleSearch(txt) {
        setSearch(txt);
        if (txt !== "") {
            setbtnClearSearch(true);
        } else {
            setbtnClearSearch(false);
        }
    }

    function clearSearch() {
        setSearch("");
        document.getElementById("table-input").value = "";
        setbtnClearSearch(false);
    }

    function checkLocation(Address) {

        let stakeholderLocation = Address.split(',');

        if (Location.province === 'MISSING') {
            if (stakeholderLocation.length < 3) {
                return true;
            }
            if (Address === '') {
                return true;
            }

        }

        let location = { province: stakeholderLocation[stakeholderLocation.length - 2], city: stakeholderLocation[stakeholderLocation.length - 3] };

        if (Location.province === '' && Location.city === '') {
            return true
        }
        if (Address !== '') {
            if (Location.province !== '' && Location.city === '') {
                if (location.province.includes(Location.province)) {
                    return true;
                }
            }
            if (Location.province !== '' && Location.city !== '') {
                if (location.province.includes(Location.province) && location.city.includes(Location.city)) {
                    return true;
                }
            }
        }

        else return false;
    }

    function checkNum(phoneNo){
        if(phoneNo.length === 0){
            return true;
            
        } else {
            return false;
        }

    }

    function checkCount(count, single) {

        if (single){
            if (count === 1){
                return true;
            } else {
                return false;
            }
        }

        if (!single) {
            if (count > 1) {
                return true;
            } else {
                return false;
            }
        }

    }


    function checkContactStatus(contactStatus, filter) {
        if (filter === 'YES') {
            if (contactStatus === 'YES') {
                return true;
            } else {
                return false;
            }
        }
        if (filter !== 'YES') {

            if (contactStatus !== 'YES') {
                return true;
            } else {
                return false;
            }
        }
    }

    function checkTableFilter(filters, stakeholder) {

        switch (Filters) {

            case 0:
                return true;

            case 1:
                return checkContactStatus(stakeholder.CONTACTED, 'YES');

            case 2:
                return checkContactStatus(stakeholder.CONTACTED, '');

            case 3:
                return checkCount(stakeholder.count, true);

            case 4:
                return checkCount(stakeholder.count, false);

            case 5:
                return checkNum(stakeholder.PHONE)
        }

    }

    function Filter(stakeholder) {
        if (stakeholder.NAME.toLowerCase().includes(search.toLowerCase())) {
            if (checkLocation(stakeholder.MAILING)) {
                if (checkTableFilter(Filters, stakeholder)) {
                    return true;
                }
            }
        }
        return false;
    }

    function getContactStatus(contactStatus) {
        if (contactStatus === 'YES') {
            return true;
        } else {
            return false;
        }
    }

    function checkMissing(location) {
        if (location.length >= 3) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <div className="input-container">

                <div className='filt-wrapper'>
                    <div className="ddl-filter">
                        <select defaultValue={contactFilter} onChange={(event) => setContactFilter(event.target.value)}>
                            <option value="">Stakeholders</option>
                            <option value="YES">Tracts</option>
                            <option value="NO">Numbers</option>
                        </select>
                    </div>

                    <input type="text" id="table-input" defaultValue="" required onChange={(e) => handleSearch(e.target.value)} placeholder="Search Stakeholders..." />

                    <div className="clearbtn-container">
                        {btnClearSearch ?
                            <div className="clear-btn-clear"><BiX size='2.5rem' cursor='pointer' color='grey' onClick={clearSearch} /></div>
                            :
                            <div className="clear-btn-search"><CgSearch size='2rem' color='grey' /></div>}
                    </div>
                </div>

                <button>Filters</button>

            </div>
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
                                        <td className='td-name'>{stakeholder.NAME}</td>
                                        <td>{stakeholder.count}</td>
                                        <td>{stakeholder.CONTACT}</td>
                                        <td>{checkMissing(location) ? location[location.length - 2] : 'MISSING'}</td>
                                        <td>{checkMissing(location) ? location[location.length - 3] : 'MISSING'}</td>
                                        <td>{stakeholder.ATTEMPTS}</td>
                                        <td>{getContactStatus(stakeholder.CONTACTED) ? <MdOutlineCheck size='2rem' color='#407945' /> : <MdOutlineClose size='2rem' color='#a4484c' />}</td>
                                        <td><MdKeyboardArrowRight size='1.5rem' color='grey' /></td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default StakeholderTable;