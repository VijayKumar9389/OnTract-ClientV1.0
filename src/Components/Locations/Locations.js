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
                    <div>
                        <h3>{location.province}</h3>
                        <h2>{location.count}</h2>
                        <ul>
                            {location.cities.map((city, index) => {
                                return <li>{city.name} - {city.count}</li>
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    );
}

export default Locations;