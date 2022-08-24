import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Sidebar.scss';
import { SiCivicrm } from "react-icons/si";

import CityList from '../Filters/CityList';

function Sidebar() {

    const [locationList, setLocationList] = useState([]);
    const location = useSelector((state) => state.location.value);



    return (
        <div className='sidebar-container'>
            <div className='sidebar-heading'>
                <SiCivicrm size="3rem" color='#68bd45' />
                <p>CRM</p>
            </div>
            <div className='sidebar-body'>
                <ul>
                    <li>Stakeholders</li>
                    <li>Search</li>
                </ul>
                {/* {location.province !== '' ?
                    <CityList Location={location} />
                    :
                    <ProvinceList ProvinceList={locationList} />
                } */}
            </div>
        </div>
    );
}

export default Sidebar;