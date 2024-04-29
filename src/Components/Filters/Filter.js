import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggle, clear } from '../../Store/Filter';
import { AiOutlineClose } from 'react-icons/ai';
import { setSearchType, setStakeholderType, setProvince, setCity, setAttempted, setContacted, setDelivery, setConsultation } from '../../Store/Filter';
import Cookies from 'js-cookie';

import './Filter.scss';
import { IoIosArrowForward } from 'react-icons/io';

function FilterMenu({ isOpen, toggle }) {

    const filter = useSelector((state) => state.filter);
    const Filters = useSelector((state) => state.filter.value);
    const province = useSelector((state) => state.filter.province);
    const city = useSelector((state) => state.filter.city);
    const Attempted = useSelector((state) => state.filter.attempted);
    const Contacted = useSelector((state) => state.filter.contacted);
    const searchType = useSelector((state) => state.filter.search.type);
    const stakeholderType = useSelector((state) => state.filter.stakeholder);
    const delivery = useSelector((state) => state.filter.delivery);
    const consultation = useSelector((state) => state.filter.consultation);

    const [locationList, setLocationList] = useState([]);
    const dispatch = useDispatch();
    const project = Cookies.get('project');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/sidebar/locations/${project}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setLocationList(response.data));
    }, [project]);

    const open = {
        right: '0'
    };

    const closed = {
        right: '-500px'
    };

    function getCity(location, data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].province === location) {
                console.log(data[i])
                return data[i];
            }
        }
    }

    if (isOpen) return (
        <>

            <div className='popup-container' style={Filters ? open : closed}>
                <div onClick={() => dispatch(toggle())} className='popup-background'></div>
                <div className='popup-wrapper'>

                    <div className='filter-heading'>
                        <h2>Filters</h2>
                        <AiOutlineClose className='close-filter-btn' onClick={() => dispatch(toggle())} />
                    </div>

                    <div className='filter-menu'>

                        <div className='filter-wrapper'>
                            <label>Province/State:</label>
                            {console.log(locationList)}
                            <select value={province} onChange={(event) => dispatch(setProvince(event.target.value))}>
                                <option value="">All</option>
                                {locationList.map((location, index) => {
                                    return <option key={index} value={location.province}>{location.province}</option>
                                })}
                            </select>
                        </div>

                        {province
                            ? <div className='filter-wrapper'>
                                <label>City:</label>
                                <select defaultValue={city} onChange={(event) => dispatch(setCity(event.target.value))}>
                                    <option value={null}>All</option>
                                    {getCity(province, locationList).cities.map((city, index) => {
                                        return <option key={index} value={city.name}>{city.name}</option>
                                    })}
                                </select>
                            </div>
                            : null
                        }

                        <div className='radio-container'>
                            <label>Search:</label>

                            <div className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="search-name" checked={searchType === 0} onChange={() => dispatch(setSearchType(0))} /> <label htmlFor="search-name">Name</label></div>
                                <div className='input-wrapper'><input type="radio" id="search-phone" checked={searchType === 1} onChange={() => dispatch(setSearchType(1))} /> <label htmlFor="search-phone">Phone</label></div>
                                <div className='input-wrapper'><input type="radio" id="search-location" checked={searchType === 2} onChange={() => dispatch(setSearchType(2))} /> <label htmlFor="search-location">Location</label></div>
                                <div className='input-wrapper'><input type="radio" id="search-tract" checked={searchType === 3} onChange={() => dispatch(setSearchType(3))} /> <label htmlFor="search-tract">Tract Number</label></div>
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
                            <label>Delivery</label>
                            <ul className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="type-corp" checked={stakeholderType === 3} onChange={() => dispatch(setStakeholderType(3))} /> <label for="type-corp">Delivered</label></div>
                                <div className='input-wrapper'><input type="radio" id="type-person" checked={stakeholderType === 4} onChange={() => dispatch(setStakeholderType(4))} /> <label for="type-person">Not Delivered</label></div>
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
                                <div className='input-wrapper'><input type="radio" id="attempt-all" checked={Attempted === null} onChange={() => dispatch(setAttempted(null))} /> <label for="attempt-all">All</label></div>
                                <div className='input-wrapper'><input type="radio" id="attempt-yes" checked={Attempted === true} onChange={() => dispatch(setAttempted(true))} /> <label for="attempt-yes">Yes</label></div>
                                <div className='input-wrapper'><input type="radio" id="attempt-no" checked={Attempted === false} onChange={() => dispatch(setAttempted(false))} /> <label for="attempt-no">No</label></div>
                            </ul>
                        </div>

                        <div className='radio-container'>
                            <label>Delivery Planned:</label>

                            <ul className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="delivery-all" checked={delivery === null} onChange={() => dispatch(setDelivery(null))} /> <label htmlFor="delivery-all">All</label></div>
                                <div className='input-wrapper'><input type="radio" id="delivery-yes" checked={delivery === true} onChange={() => dispatch(setDelivery(true))} /> <label htmlFor="delivery-yes">Yes</label></div>
                                <div className='input-wrapper'><input type="radio" id="delivery-no" checked={delivery === false} onChange={() => dispatch(setDelivery(false))} /> <label htmlFor="delivery-no">No</label></div>
                            </ul>
                        </div>

                        <div className='radio-container'>
                            <label>Consultated:</label>

                            <ul className='radio-wrapper'>
                                <div className='input-wrapper'><input type="radio" id="consultation-all" checked={consultation === null} onChange={() => dispatch(setConsultation(null))} /> <label htmlFor="consultation-all">All</label></div>
                                <div className='input-wrapper'><input type="radio" id="consultation-yes" checked={consultation === true} onChange={() => dispatch(setConsultation(true))} /> <label htmlFor="consultation-yes">Yes</label></div>
                                <div className='input-wrapper'><input type="radio" id="consultation-no" checked={consultation === false} onChange={() => dispatch(setConsultation(false))} /> <label htmlFor="consultation-no">No</label></div>
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
