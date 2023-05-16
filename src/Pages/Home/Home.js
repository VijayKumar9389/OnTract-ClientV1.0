import './Home.scss';

import StakeholderTable from '../../Components/Table/StakeholderTable/StakeholderTable';
import Input from '../../Components/Input/Input';
import FilterMenu from '../../Components/Filters/Filter';
import Report from '../../Components/Reports/Report';

function Home() {

    return (
        <div className='home-container'>
            <div className='home-body'>
                <Report />
                <FilterMenu isOpen={false} />
                <Input />
                <StakeholderTable />
            </div>
        </div>
    );
}

export default Home;