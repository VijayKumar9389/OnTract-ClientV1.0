import Navbar from '../../Components/Navbar/Navbar';
import './Analytics.scss';

function Analytics() {

    return(
    <div className='analytics-container'>
        <Navbar />
        <div className='grid'>
        <div className='item-one'><a>1</a></div>
        <div className='item-two'><a>2</a></div>
        <div className='item-three'><a>3</a></div>
        <div className='item-four'><a>4</a></div>
        </div>

    </div>
    )

}

export default Analytics;