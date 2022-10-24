import Locations from '../../Components/Locations/Locations';
import Report from '../../Components/Reports/Report';
import './Analytics.scss';

function Analytics() {


    return (
    <div className='analytics-container'>
        <Report />
        <Locations />
    </div>
    )
}

export default Analytics;