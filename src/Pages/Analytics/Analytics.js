import Locations from '../../Components/Locations/Locations';
import Report from '../../Components/Reports/Report';
import './Analytics.scss';

function Analytics() {

    return (
        <div className='analytics-wrapper'>
            <Report />
            <Locations />
        </div>
    )
}

export default Analytics;