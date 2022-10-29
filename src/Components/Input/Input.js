import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle, setSearch, clearSearch as cs } from '../../Store/Filter';

import './Input.scss';
import { BiX } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';
import { BsFilterRight } from 'react-icons/bs'
import { BsDownload } from 'react-icons/bs'

export default function Input() {

    const tblSearch = useSelector((state) => state.filter.search.txt);
    const searchType = useSelector((state) => state.filter.search.type);
    const dispatch = useDispatch();

    function clearSearch() {
        document.getElementById("table-input").value = "";
        dispatch(cs());
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
        <div className="input-container">
            <div className='filt-wrapper'>
                <div className="clearbtn-container">
                    {tblSearch !== '' ?
                        <div className="clear-btn-clear"><BiX size='2.5rem' cursor='pointer' color='grey' onClick={() => clearSearch()} /></div>
                        :
                        <div className="clear-btn-search"><CgSearch size='2rem' color='grey' /></div>}
                </div>
                <input type="text" id="table-input" defaultValue={tblSearch} onChange={(e) => dispatch(setSearch(e.target.value))} placeholder={getSearchType()} />
            </div>
            <button onClick={() => dispatch(toggle(true))}>< BsDownload size='2rem' /></button>
            <button onClick={() => dispatch(toggle(true))}>< BsFilterRight size='2rem' /></button>
        </div>
    )
}
