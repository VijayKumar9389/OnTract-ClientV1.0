import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProvince, setCity } from '../../Store/Filter';

import { BiArrowToLeft } from "react-icons/bi";

export default function CityList({ Location }) {

    const dispatch = useDispatch();
    const Province = useSelector((state) => state.filter.location.province);

    // function checkActive(cityName) {
    //     if (Location.city === cityName) {
    //         return { backgroundColor: '#68bd45', color: '#fff' };
    //     } else {
    //         return { backgroundColor: '' };
    //     }
    // }

    function findCities() {

        for (let index = 0; index < Location.length; index++) {
            if (Province !== null && Province === Location[index].province) {
                return Location.cityList;
            }
        }

    }

    return (
        <ul>
            {console.log(findCities())}
            {findCities().map((city, index) => {
                return (
                    <li key={index} onClick={() => dispatch(setCity({ province: Location.province, city: city.name, cityList: Location.cityList }))}>
                        <a>{city.name}</a><a>({city.count})</a>
                    </li>
                );
            })}
        </ul>
    )
}
