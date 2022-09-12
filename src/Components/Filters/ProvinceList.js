import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { setProvince } from '../../Store/Filter';

export default function ProvinceList({ ProvinceList }) {

    const dispatch = useDispatch();
    const Province = useSelector((state) => state.filter.location.province);

    return (
        <ul>
            {ProvinceList.map((location, index) => {
                return (
                    <li key={index} onClick={() => dispatch(setProvince({ province: location.province, city: null, cityList: location.cities }))}>
                        <a>{location.province}</a><a>({location.count})</a>
                    </li>
                );
            })}
        </ul>
    )
}
