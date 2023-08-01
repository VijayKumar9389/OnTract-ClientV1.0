import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggle, clear } from '../../Store/Filter';
import { AiOutlineClose } from 'react-icons/ai';
import { setSearchType, setStakeholderType, setProvince, setCity, setAttempted, setContacted } from '../../Store/Filter';

import './Filter.scss';
import { IoIosArrowForward } from 'react-icons/io';

function FilterMenu({ isOpen, toggle }) {

    const filter = useSelector((state) => state.filter);
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
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/sidebar/routes`, {
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

    if (isOpen) return (
        <>

            <div className='popup-container' style={Filters ? open : closed}>
                <div onClick={() => dispatch(toggle())} className='popup-background'></div>
                <div className='popup-wrapper'>

                    <div className='filter-heading'>
                        <h2>Filters</h2>
                        <AiOutlineClose className='close-filter-btn' onClick={() => dispatch(toggle(false))} />
                    </div>

                    <div className='filter-menu'>

                        <div className='filter-wrapper'>
                            <label>Province:</label>
                            <select defaultValue={Province} onChange={(event) => dispatch(setProvince(event.target.value))}>
                                <option value={null}>All</option>
                                {locationList.map((location, index) => {
                                    return <option key={index} value={location.province}>{location.province}</option>
                                })}
                            </select>
                        </div>

                        <div className='filter-wrapper'>
                        <label>City:</label>
                            {!Province ? null :
                                <select defaultValue={City} onChange={(event) => dispatch(setCity(event.target.value))}>
                                    <option value={null}>All</option>
                                    {getCities().map((city, index) => {
                                        return <option key={index} value={city.name}>{city.name}</option>
                                    })}
                                </select>}
                        </div>

                        <div className='radio-container'>
                        <label>Search:</label>
                            
                            <div className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="search-name" checked={searchType === 0} onChange={() => dispatch(setSearchType(0))} /> <label for="search-name">Name</label></div>
                                <div className='input-wrapper'><input type="radio" id="search-phone" checked={searchType === 1} onChange={() => dispatch(setSearchType(1))} /> <label for="search-phone">Phone</label></div>
                            </div>
                        </div>

                        <div className='radio-container'>
                        <label>Type:</label>
                          
                            <ul className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="type-all" checked={stakeholderType === 0} onChange={() => dispatch(setStakeholderType(0))} /> <label for="type-all">All</label></div>
                                <div className='input-wrapper'><input type="radio" id="type-single" checked={stakeholderType === 1} onChange={() => dispatch(setStakeholderType(1))} /> <label for="type-single">Single-Tract</label></div>
                                <div className='input-wrapper'><input type="radio" id="type-multi" checked={stakeholderType === 2} onChange={() => dispatch(setStakeholderType(2))} /> <label for="type-multi">Multi-Tract</label></div>
                            </ul>

                        </div>

                        <div className='radio-container'>
                        <label>Corperation</label>
                            <ul className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="type-corp" checked={stakeholderType === 3} onChange={() => dispatch(setStakeholderType(3))} /> <label for="type-corp">Corperation</label></div>
                                <div className='input-wrapper'><input type="radio" id="type-person" checked={stakeholderType === 4} onChange={() => dispatch(setStakeholderType(4))} /> <label for="type-person">Person</label></div>
                                <div className='input-wrapper'><input type="radio" id="type-nophone" checked={stakeholderType === 5} onChange={() => dispatch(setStakeholderType(5))} /> <label for="type-nophone">No Phone</label></div>

                            </ul>
                        </div>

                        <div className='radio-container'>
                        <label>Contacted:</label>
                            
                            <ul className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="contact-all" checked={Contacted === null} onChange={() => dispatch(setContacted(null))} /> <label for="contact-all">All</label></div>
                                <div className='input-wrapper'><input type="radio" id="contact-yes" checked={Contacted === true} onChange={() => dispatch(setContacted(true))} /> <label for="contact-yes">Yes</label></div>
                                <div className='input-wrapper'><input type="radio" id="contact-no" checked={Contacted === false} onChange={() => dispatch(setContacted(false))} /> <label for="contact-no">No</label></div>
                            </ul>
                        </div>

                        <div className='radio-container'>
                        <label>Attempted:</label>
                            
                            <ul className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="attempt-all" checked={Attempted === null} onChange={() => dispatch(setAttempted(null))} /> <label for="contact-all">All</label></div>
                                <div className='input-wrapper'><input type="radio" id="attempt-yes" checked={Attempted === true} onChange={() => dispatch(setAttempted(true))} /> <label for="contact-yes">Yes</label></div>
                                <div className='input-wrapper'><input type="radio" id="attempt-no" checked={Attempted === false} onChange={() => dispatch(setAttempted(false))} /> <label for="contact-no">No</label></div>
                            </ul>
                        </div>

                    </div>
                    <div className='filter-btn-menu'>
                        <button onClick={() => dispatch(clear())}>Clear Filters</button>
                    </div>
                </div>

            </div>
        </>

    )
}

export default FilterMenu;