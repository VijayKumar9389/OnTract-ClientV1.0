import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Filter } from '../../Helpers/utils';


import './Home.scss';
import StakeholderTable from '../../Components/Table/StakeholderTable/StakeholderTable';
import StakeholderMobileRow from '../../Components/StakeholderMobileRow/StakeholderMobileRow';
import Report from '../../Components/Reports/Report';
import Input from '../../Components/Input/Input';
const isMobile = window.innerWidth <= 1024;

function Home({ LogOut, toggle }) {

    const [stakeholders, setStakeholders] = useState([]);
    const tblFilter = useSelector((state) => state.filter);
    const project = Cookies.get('project');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/getall/${project}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setStakeholders(response.data));
    }, [project]);

    const stakeholderList = (stakeholders) => {
        return (
            <ul className='stakeholder-list'>
                {stakeholders.map((stakeholder, index) => {
                    if (Filter(stakeholder, tblFilter)) return <StakeholderMobileRow key={index} stakeholder={stakeholder} />
                })}
            </ul>
        )
    }

    const getProjectName = () => {
        let project = Cookies.get('project');
        let details = project.split('_');
        return details[0] + " " + details[1];
    }

    return (
        <div className='home-container'>
            <div className='header'>
                <h1 className='home-title'>{getProjectName()}</h1>
                <div className='header-btn-wrapper'>
                    <button className='project-btn' onClick={toggle}>Switch Project</button>
                    <button className='logout-btn' onClick={LogOut}>Logout</button>

                </div>
            </div>
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