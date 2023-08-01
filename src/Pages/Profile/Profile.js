import { useLocation, useParams } from 'react-router-dom';

import './Profile.scss';

import StakeholderForum from '../../Components/StakeholderForum/StakeholderForum';
import TractTable from '../../Components/Table/TractTable/TractTable';
import TractIndex from '../../Components/TractIndex/TractIndex';
import Relations from '../../Components/Relations/Relations';

function Profile() {

    const { state } = useLocation();
    const { stakeholder } = state;
    const { name } = useParams();

    return (
        <div className='profile-container'>
            <StakeholderForum key={name} Stakeholder={stakeholder} />
            <TractTable Stakeholder={name} />
            {/* <TractIndex /> */}
        </div>
    );
}

export default Profile;