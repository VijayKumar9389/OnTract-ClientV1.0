import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Home.scss';
import { MdLogout } from 'react-icons/md';
import { BiDownload } from 'react-icons/bi';

import Sidebar from '../../Components/Sidebar/Sidebar';
import StakeholderTable from '../../Components/Table/StakeholderTable/StakeholderTable';
import Report from '../../Components/Reports/Report';
import MasterTable from '../../Components/Table/MasterTable/MasterTable';
import Input from '../../Components/Input/Input';

function Home({ LogOut }) {

    const [filter, setFilter] = useState(0);
    const [search, setSearch] = useState("");
    const [tableSearch, setTableSearch] = useState('1');


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
            <Sidebar />
            <div className='home-body'>
                <div className='heading'>
                    <div className='heading-wrapper'>
                        <h2>STAKEHOLDERS</h2>
                        <div className='btn-container'>
                            <button className='download' onClick={() => downloadFile()}>Download&nbsp;< BiDownload color='#5B8A5F' size='1rem' /></button>
                            <button className='logout' onClick={LogOut}>Logout&nbsp;< MdLogout color='#C1676E' size='1rem' /></button>
                        </div>
                    </div>
                </div>
                <Report/>
                <Input />
                {tableSearch === '1' ? <StakeholderTable Search={search} /> : <MasterTable Filters={filter} Search={search} /> }
            </div>
        </div>
    );
}

export default Home;