import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { toggle, setSearch, clearSearch as cs } from '../../Store/Filter';
import { setRoute } from '../../Store/Filter';
import FilterMenu from '../Filters/Filter';

import './Input.scss';
import { BiX } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';
import { BsFilterRight } from 'react-icons/bs'
import { BsDownload } from 'react-icons/bs'

export default function Input() {

    const [isOpen, setIsOpen] = useState(false);
    const [routes, setRoutes] = useState([]);
    const tblSearch = useSelector((state) => state.filter.search.txt);
    const searchType = useSelector((state) => state.filter.search.type);
    const route = useSelector((state) => state.filter.route);
    const dispatch = useDispatch();

    const project = Cookies.get('project');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/routes/get/${project}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((res) => setRoutes(res.data));
    }, [project])

    function clearSearch() {
        document.getElementById("table-input").value = "";
        dispatch(cs());
    }

    function toggle() {
        setIsOpen(!isOpen)
    }

    function getSearchType() {
        switch (searchType) {
            case 0:
                return 'Search for Stakeholders'
            case 1:
                return 'Search for Phone Number'
            case 2:
                return 'Search for Tract Number'
        }
    }

    return (
        <div className="filter-container">

            <FilterMenu isOpen={isOpen} toggle={toggle} />

            <select value={route} onChange={(e) => dispatch(setRoute(e.target.value))} >
                <option value=""> No Route Selected</option>
            {console.log(routes)}
                {routes.map((route, index) => (
                    <option key={index} value={route.ROUTE}>{route.ROUTE}</option>
                ))}
            </select>

            <div className='filt-wrapper'>
                <div className="clearbtn-container">
                    {
                        tblSearch !== ''
                            ? <div className="clear-btn-clear"><BiX size='2.5rem' cursor='pointer' color='grey' onClick={() => clearSearch()} /></div>
                            : <div className="clear-btn-search"><CgSearch size='2rem' color='grey' /></div>
                    }
                </div>
                <input type="text" id="table-input" defaultValue={tblSearch} onChange={(e) => dispatch(setSearch(e.target.value))} placeholder={getSearchType()} />
            </div>

            <button onClick={() => dispatch(toggle())}>< BsFilterRight className='icon' size='2rem' /> </button>

        </div>
    );
}
