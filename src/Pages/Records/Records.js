import Navbar from '../../Components/Navbar/Navbar';
import Log from '../../Components/Logs/Logs';
import './Records.scss';
import { useState } from 'react';

function Records() {
    return(
    <div className='records-container'>  
        <Log />
    </div>
    )

}

export default Records;