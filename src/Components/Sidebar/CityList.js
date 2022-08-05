import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { change, clear } from '../../Store/Location';

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
            <li className='li-exit' onClick={() => dispatch(clear())}><BiArrowToLeft size='2rem' /><a>{Location.province}</a></li>
            {Location.cityList.map((city, index) => {
                return (
                    <li key={index} style={checkActive(city.name)} onClick={() => dispatch(change({ province: Location.province, city: city.name, cityList: Location.cityList }))}>
                        <a>{city.name}</a><a>({city.count})</a>
                    </li>
                );
            })}
        </ul>
    )
}
