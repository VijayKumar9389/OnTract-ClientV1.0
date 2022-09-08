import { Link } from 'react-router-dom';

import './Navbar.scss';
import { SiCivicrm } from "react-icons/si";

function Navbar() {


    return (
        <div className='header-home'>
            <div className='heading-wrapper'>
                <div className='sidebar-heading'>
                    <SiCivicrm size="3rem" color='#68bd45' />
                    <p>Triton</p>
                    <a>CRM</a>
                </div>
            </div>
            <div className='menu-wrapper'>
                <div className='nav-wrapper'>
                    <ul className='nav-menu'>
                        <Link to={`/`}><li>Stakeholders</li></Link>
                        <Link to={`/Analytics`}><li>Reports</li></Link>
                        <Link to={`/Analytics`}><li>Project</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;