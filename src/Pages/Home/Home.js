import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import {Filter} from '../../Helpers/utils';


import './Home.scss';
import StakeholderTable from '../../Components/Table/StakeholderTable/StakeholderTable';
import StakeholderMobileRow from '../../Components/StakeholderMobileRow/StakeholderMobileRow';
import Report from '../../Components/Reports/Report';
import Input from '../../Components/Input/Input';
const isMobile = window.innerWidth <= 1024;

function Home() {

    const [stakeholders, setStakeholders] = useState([]);
    const tblFilter = useSelector((state) => state.filter);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setStakeholders(response.data));
    }, []);

    const stakeholderList = (stakeholders) => {
        return (
            <ul className='stakeholder-list'>
                {stakeholders.map((stakeholder, index) => {
                    if (Filter(stakeholder, tblFilter)) return <StakeholderMobileRow key={index} stakeholder={stakeholder} />
                })}
            </ul>
        )
    }

    return (
        <div className='home-container'>
            <div className='home-body'>
                <Report />
                {/* <FilterMenu isOpen={false} /> */}
                <Input />
                {isMobile
                    ? <>{stakeholderList(stakeholders)}</>
                    : <StakeholderTable stakeholders={stakeholders} />
                }
            </div>
        </div>
    );
}

export default Home;