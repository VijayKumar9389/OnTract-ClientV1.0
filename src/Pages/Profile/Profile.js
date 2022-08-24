import { Link, useLocation, useParams } from 'react-router-dom';

import './Profile.scss';
import { BsArrowLeftShort } from "react-icons/bs";

import StakeholderForum from '../../Components/StakeholderForum/StakeholderForum';
import TractTable from '../../Components/Table/TractTable/TractTable';
import Relations from '../../Components/Relations/Relations';

function Profile() {

    const { state } = useLocation();
    const { stakeholder } = state;
    const { name } = useParams();

    return (
        <div className='profile-container'>
            <div className='heading'>
                <Link className='link' to='/'><BsArrowLeftShort size='2rem' /></Link><h2>{name}</h2>
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