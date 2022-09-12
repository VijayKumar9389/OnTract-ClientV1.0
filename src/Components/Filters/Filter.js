import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggle, clear } from '../../Store/Filter';
import { setSearchType, setStakeholderType, setProvince, setCity, setAttempted, setContacted } from '../../Store/Filter';

import './Filter.scss';
import { IoIosArrowForward } from 'react-icons/io';

function FilterMenu({ isOpen }) {

    const Filters = useSelector((state) => state.filter.value);
    const Province = useSelector((state) => state.filter.location.province);
    const City = useSelector((state) => state.filter.location.city);
    const Attempted = useSelector((state) => state.filter.attempted);
    const Contacted = useSelector((state) => state.filter.contacted);
    const searchType = useSelector((state) => state.filter.search.type);
    const stakeholderType = useSelector((state) => state.filter.stakeholder);

    const [locationList, setLocationList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/sidebar/locations`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setLocationList(response.data));
    }, []);

    const open = {
        right: '0'
    };

    const closed = {
        right: '-500px'
    };

    function getCities() {
        for (let index = 0; index < locationList.length; index++) {
            if (locationList[index].province === Province) {
                return locationList[index].cities;
            }
        }
        return [];
    }

    return (
        <>
            {Filters ? <div onClick={() => dispatch(toggle(false))} className='filter-cover'></div> : null}
            <div className='filter-container' style={Filters ? open : closed}>
                <div className='filter-menu'>
                    <div className='filter-location'>
                        <ul>
                            <div className='ddl-container'>
                                Province:
                                <select defaultValue={Province} onChange={(event) => dispatch(setProvince(event.target.value))}>
                                    <option value={null}>All</option>
                                    {locationList.map((location, index) => {
                                        return <option key={index} value={location.province}>{location.province}</option>
                                    })}
                                </select>
                            </div>
                            <div className='ddl-container'>
                                City:
                                {!Province ? null :
                                    <select defaultValue={City} onChange={(event) => dispatch(setCity(event.target.value))}>
                                        <option value={null}>All</option>
                                        {getCities().map((city, index) => {
                                            return <option key={index} value={city.name}>{city.name}</option>
                                        })}
                                    </select>}
                            </div>
                            <div className='radio-container'>
                                Search:
                                <div className='ddl-wrapper'>
                                    <div className='input-wrapper'><input type="radio" checked={searchType === 0} onChange={() => dispatch(setSearchType(0))} /> Name</div>
                                    <div className='input-wrapper'><input type="radio" checked={searchType === 1} onChange={() => dispatch(setSearchType(1))} /> Phone</div>
                                </div>
                            </div>
                            <div className='radio-container'>
                                Type:
                                <div className='ddl-wrapper'>
                                    <div className='input-wrapper'><input type="radio" checked={stakeholderType === 0} onChange={() => dispatch(setStakeholderType(0))} /> All</div>
                                    <div className='input-wrapper'><input type="radio" checked={stakeholderType === 1} onChange={() => dispatch(setStakeholderType(1))} /> Single-Tract</div>
                                    <div className='input-wrapper'><input type="radio" checked={stakeholderType === 2} onChange={() => dispatch(setStakeholderType(2))} /> Multi-Tract</div>
                                    <div className='input-wrapper'><input type="radio" checked={stakeholderType === 3} onChange={() => dispatch(setStakeholderType(3))} /> Corperation</div>
                                    <div className='input-wrapper'><input type="radio" checked={stakeholderType === 4} onChange={() => dispatch(setStakeholderType(4))} /> Person</div>
                                    <div className='input-wrapper'><input type="radio" checked={stakeholderType === 5} onChange={() => dispatch(setStakeholderType(5))} /> No Phone</div>
                                </div>
                            </div>
                            <div className='radio-container'>
                                Contacted:
                                <div className='ddl-wrapper'>
                                    <div className='input-wrapper'><input type="radio" checked={Contacted === null} onChange={() => dispatch(setContacted(null))} /> All</div>
                                    <div className='input-wrapper'><input type="radio" checked={Contacted === true} onChange={() => dispatch(setContacted(true))} /> Yes</div>
                                    <div className='input-wrapper'><input type="radio" checked={Contacted === false} onChange={() => dispatch(setContacted(false))} /> No</div>
                                </div>
                            </div>
                            <div className='radio-container'>
                                Attempted:
                                <div className='ddl-wrapper'>
                                    <div className='input-wrapper'><input type="radio" checked={Attempted === null} onChange={() => dispatch(setAttempted(null))} /> All</div>
                                    <div className='input-wrapper'><input type="radio" checked={Attempted === true} onChange={() => dispatch(setAttempted(true))} /> Yes</div>
                                    <div className='input-wrapper'><input type="radio" checked={Attempted === false} onChange={() => dispatch(setAttempted(false))} /> No</div>
                                </div>
                            </div>
                        </ul>

                    </div>
                </div>
                <div className='filter-btn-container'>
                    {Filters ? <button className='btn-close' onClick={() => dispatch(toggle(false))}><IoIosArrowForward /></button> : null}
                </div>
            </div>
        </>

    )
}

export default FilterMenu;