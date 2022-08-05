import React from 'react'
import { useDispatch } from 'react-redux';
import { change } from '../../Store/Location';

export default function ProvinceList({ ProvinceList }) {

    const dispatch = useDispatch();

    return (
        <ul>
            {ProvinceList.map((location, index) => {
                return (
                    <li key={index} onClick={() => dispatch(change({ province: location.province, city: '', cityList: location.cities }))}>
                        <a>{location.province}</a><a>({location.count})</a>
                    </li>
                );
            })}
        </ul>
    )
}
