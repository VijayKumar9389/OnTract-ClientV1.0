import { useState } from 'react';
import axios from 'axios';

import './Home.css';
import { MdLogout } from 'react-icons/md';
import { BiDownload } from 'react-icons/bi';

import Sidebar from '../../Components/Sidebar/Sidebar';
import StakeholderTable from '../../Components/StakeholderTable/StakeholderTable';
import Report from '../../Components/Reports/Report';

function Home({ LogOut }) {

    const [location, setLocation] = useState({ province: '', city: '' });
    const [filter, setFilter] = useState(0);

    function setLocationFilter(location) {
        setLocation(location);
    }

    function setTableFilter(Filter) {
        console.log(Filter)
        setFilter(Filter);
    }

    function downloadFile() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/getExcel/download`, {
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'blob',
                "access-token": localStorage.getItem("access-token")
            },
        }).then((response) => {
            const link = document.createElement('a');
            const fileName = 'Project.xlsx';
            link.setAttribute('download', fileName);
            link.href = URL.createObjectURL(new Blob([response.data]));
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    return (
        <div className='home-container'>
            <Sidebar setLocation={location => setLocationFilter(location)} />
            <div className='home-body'>
                <div className='home-heading'>
                    <div className='heading-wrapper'>
                        <h2>STAKEHOLDERS</h2>
                        <div className='btn-container'>
                            <button className='btn-download' onClick={() => downloadFile()}>Download&nbsp;< BiDownload color='#5B8A5F' size='1rem' /></button>
                            <button className='btn-logout' onClick={LogOut}>Logout&nbsp;< MdLogout color='#C1676E' size='1rem' /></button>
                        </div>
                    </div>
                </div>
                <Report setFilter={Filter => setTableFilter(Filter)} Filter={filter}/>
                <StakeholderTable Location={location} Filters={filter}/>
            </div>
        </div>
    );
}

export default Home;