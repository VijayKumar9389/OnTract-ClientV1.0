import { useState } from 'react';
import axios from 'axios';

import './Home.css';
import { MdLogout } from 'react-icons/md';

import Sidebar from '../../Components/Sidebar/Sidebar';
import StakeholderTable from '../../Components/StakeholderTable/StakeholderTable';
import Report from '../../Components/Reports/Report';

function Home({ Logout }) {

    const [location, setLocation] = useState({ province: '', city: '' });

    function setLocationFilter(location) {
        setLocation(location);
    }

    function downloadFile() {
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/getExcel/download`, {
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${Date.now()}.xlsx`);
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <div className='home-container'>
            <Sidebar setLocation={location => setLocationFilter(location)} />
            <div className='home-body'>
                <div className='home-heading'>
                    <div className='heading-wrapper'>
                        <h2>STAKEHOLDERS</h2>
                        <button onClick={() => downloadFile()}>Download Project</button>
                        <div className='logout-container'>
                            <div className='logout-info-container'>< MdLogout color='gray' size='3rem' /></div>
                            <div className='logout-btn-container'>
                                <li className='btn-logout' onClick={Logout}>Log Out</li>
                            </div>
                        </div>
                    </div>
                </div>
                <Report />
                <StakeholderTable Location={location} />
            </div>
        </div>
    );
}

export default Home;