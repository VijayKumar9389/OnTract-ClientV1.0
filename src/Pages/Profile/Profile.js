import { Link, useLocation, useParams } from 'react-router-dom';

import './Profile.css';
import { BiArrowToLeft } from "react-icons/bi";

import StakeholderForum from '../../Components/StakeholderForum/StakeholderForum';
import TractTable from '../../Components/TractTable/TractTable';
import Relations from '../../Components/Relations/Relations';

function Profile() {

    const { state } = useLocation();
    const { stakeholder } = state;
    const { name } = useParams();

    return (
        <div className='profile-container'>
            <div className='profile-heading'>
                <Link className='profile-link' to='/'><BiArrowToLeft size='2rem' /><h2>&nbsp;STAKEHOLDERS&nbsp;</h2></Link><h2>/{name}</h2>
            </div>
            <div className='profile-wrapper'>
                <StakeholderForum key={name} Stakeholder={stakeholder} />
                <Relations Stakeholder={name} />
            </div>
            <TractTable Stakeholder={name} />
        </div>
    );
}

export default Profile;