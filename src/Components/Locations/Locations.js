import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Locations.scss';
import { SiCivicrm } from "react-icons/si";

import CityList from '../Filters/CityList';

function Locations() {

    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5500/api/stakeholders/sidebar/locations", {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setLocationList(response.data));
    }, []);

    return (
        <div className='location-container'>
            {locationList.map((location, index) => {
                return (<h3>{location.province}</h3>)
            })}
        </div>
    );
}

export default Locations;