import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { MdAnalytics, MdAssignment, MdHistory, MdPeopleAlt, MdSearch } from 'react-icons/md';
import { FaTruck } from 'react-icons/fa';

function Sidebar() {

    return (
        <div className='sidebar-container'>
            <div className='sidebar-wrapper'>
                <h1>Triton</h1>
                <ul className='nav-menu'>
                    <Link className='menu-item' to={`/`}><li> <MdPeopleAlt className='menu-icon' />Stakeholders</li></Link>
                    <Link className='menu-item' to={`/`}><li> <MdSearch className='menu-icon' /> Search</li></Link>
                    <Link className='menu-item' to={`/`}><li> <FaTruck className='menu-icon' /> Deliverys</li></Link>
                    <Link className='menu-item' to={`/`}><li> <MdAssignment className='menu-icon' /> Projects</li></Link>
                    <Link className='menu-item' to={`/Analytics`}><li> <MdAnalytics className='menu-icon' /> Analytics</li></Link>
                    <Link className='menu-item' to={`/Records`}><li> <MdHistory className='menu-icon' /> Records</li></Link>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;