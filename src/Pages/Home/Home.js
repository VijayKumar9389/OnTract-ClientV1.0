import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Home.scss';

import Sidebar from '../../Components/Sidebar/Sidebar';
import StakeholderTable from '../../Components/Table/StakeholderTable/StakeholderTable';
import Input from '../../Components/Input/Input';
import FilterMenu from '../../Components/Filters/Filter';
import Report from '../../Components/Reports/Report';
import Navbar from '../../Components/Navbar/Navbar';

function Home({ LogOut }) {

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
            <div className='home-body'>
                <Navbar />
                <Report />
                <FilterMenu isOpen={false} />
                <Input />
                <StakeholderTable/>
            </div>
        </div>
    );
}

export default Home;