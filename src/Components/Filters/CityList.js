import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setProvince } from '../../Store/Filter';

import { BiArrowToLeft } from "react-icons/bi";

export default function CityList({ Location }) {

    const dispatch = useDispatch();

    function checkActive(cityName) {
        if (Location.city === cityName) {
            return { backgroundColor: '#68bd45', color: '#fff' };
        } else {
            return { backgroundColor: '' };
        }
    }

    return (
        <ul>
            {Location.cityList.map((city, index) => {
                return (
                    <li key={index} style={checkActive(city.name)} onClick={() => dispatch(setProvince({ province: Location.province, city: city.name, cityList: Location.cityList }))}>
                        <a>{city.name}</a><a>({city.count})</a>
                    </li>
                );
            })}
        </ul>
    )
}
