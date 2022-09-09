import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../Store/Filter';
import './Filter.scss';
import { IoAdd } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProvinceList from './ProvinceList';
import CityList from './CityList';
import { setSearchType } from '../../Store/Filter';
import { BsNutFill } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';

function FilterMenu({ isOpen }) {

    const Filters = useSelector((state) => state.filter.value);
    const Location = useSelector((state) => state.filter.location);
    const searchType = useSelector((state) => state.filter.search.type);

    const [locationList, setLocationList] = useState([]);
    const [menu, setMenu] = useState(null);
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

    function subMenu() {
        switch (menu) {
            case 0:
                return (
                    <ProvinceList ProvinceList={locationList} />
                )
            case 1:
                return (
                    <CityList Location={Location} />
                )
            case 2:
                return (
                    <ul>
                        <li onClick={() => dispatch(setSearchType(0))}>Name</li>
                        <li onClick={() => dispatch(setSearchType(1))}>Phone</li>
                        <li onClick={() => dispatch(setSearchType(2))}>Tract</li>
                    </ul>
                )
            case 3:
                return (
                    <ul>
                        <li>Yes</li>
                        <li>No</li>
                    </ul>
                )
            case 4:
                return (
                    <ul>
                        <li>Single-Tract</li>
                        <li>Multi-Multi</li>
                        <li>Corperation</li>
                    </ul>
                )
            case 5:
                return (
                    <ul>
                        <li>Yes</li>
                        <li>No</li>
                    </ul>
                )
        }
    }

    return (
        <>
            {Filters ? <div onClick={() => dispatch(toggle(false))} className='filter-cover'></div> : null}
            <div className='filter-container' style={Filters ? open : closed}>
                <div className='filter-menu'>
                    <div className='filter-location'>
                        {menu != null ? subMenu() :
                            <ul>
                                <li onClick={() => setMenu(0)}>Province<IoAdd /></li>
                                {Location.province === null ? <li className='null-item'>City<IoAdd /></li> : <li onClick={() => setMenu(1)}>City<IoAdd /></li>}
                                <li>
                                    Search
                                    <div>
                                        <input type="radio" value="Name" checked={searchType === 0} onChange={() => dispatch(setSearchType(0))}/> Name
                                        <input type="radio" value="Phone" checked={searchType === 1} onChange={() => dispatch(setSearchType(0))}/> Phone
                                        <input type="radio" value="Tract" checked={searchType === 2} onChange={() => dispatch(setSearchType(0))}/> Tract
                                    </div>
                                </li>
                                <li onClick={() => setMenu(4)}>Stakeholder Type<IoAdd /></li>
                                <li onClick={() => setMenu(3)}>Contacted<IoAdd /></li>
                                <li onClick={() => setMenu(5)}>Attempted<IoAdd /></li>
                            </ul>
                        }
                    </div>
                    <div className='filter-btn-container'>
                        {menu == null ? null : <button className='btn-cancel' onClick={() => setMenu(null)}>Cancel</button>}
                        {Filters ? <button className='btn-close' onClick={() => dispatch(toggle(false))}><IoIosArrowForward /></button> : null}

                    </div>
                </div>

            </div>
        </>

    )
}

export default FilterMenu;