import Navbar from '../../Components/Navbar/Navbar';
import Log from '../../Components/Logs/Logs';
import './Report.scss';
import Report from '../../Components/Reports/Report';

function Reports() {

    return(
    <div className='analytics-container'>
        <Navbar />
        <Report />
    </div>
    )

}

export default Reports;