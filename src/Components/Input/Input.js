import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, clear } from '../../Store/Search';

import './Input.scss';
import { BiX } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';

export default function Input() {

    const tblSearch = useSelector((state) => state.search.value);
    const dispatch = useDispatch();

    function clearSearch() {
        document.getElementById("table-input").value = "";
        dispatch(clear());
    }

    return (
        <div className="input-container">
            <div className='filt-wrapper'>
{/* 
                <div className="ddl-filter">
                    <select defaultValue={tableSearch} onChange={(event) => setTableSearch(event.target.value)}>
                        <option value="0">Stakeholders</option>
                        <option value="1">Tracts</option>
                        <option value="2">Numbers</option>
                    </select>
                </div> */}

                <input type="text" id="table-input" defaultValue={tblSearch.txt} onChange={(e) => dispatch(change({ txt: e.target.value }))} placeholder="Search Stakeholders..." />

                <div className="clearbtn-container">
                    {tblSearch.txt !== '' ?
                        <div className="clear-btn-clear"><BiX size='2.5rem' cursor='pointer' color='grey' onClick={() => clearSearch()} /></div>
                        :
                        <div className="clear-btn-search"><CgSearch size='2rem' color='grey' /></div>}
                </div>
            </div>

            <button>Filters</button>

        </div>
    )
}
