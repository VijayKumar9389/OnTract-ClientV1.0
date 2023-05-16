import { useEffect, useState } from 'react';
import axios from 'axios';

import './Locations.scss';

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
                return (
                    <div className='location'>
                        <div className='location-header'>
                            <h2>{location.province}</h2>
                            <h3>{location.count}</h3>
                        </div>
                        <ul>
                            {location.cities.map((city, index) => {
                                return <li><label>{city.name}</label><label>{city.count}</label></li>
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    );
}

export default Locations;