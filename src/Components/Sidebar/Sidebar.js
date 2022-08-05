import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Sidebar.scss';
import { SiCivicrm } from "react-icons/si";

import ProvinceList from './ProvinceList';
import CityList from './CityList';

function Sidebar() {

    const [locationList, setLocationList] = useState([]);
    const location = useSelector((state) => state.location.value);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/sidebar/locations`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setLocationList(response.data));
    }, []);

    return (
        <div className='sidebar-container'>
            <div className='sidebar-heading'>
                <SiCivicrm size="3rem" color='#68bd45' />
                <p>Triton</p>
                <h1>CRM</h1>
            </div>
            <div className='sidebar-body'>
                {location.province !== '' ?
                    <CityList Location={location} />
                    :
                    <ProvinceList ProvinceList={locationList} />
                }
            </div>
        </div>
    );
}

export default Sidebar;