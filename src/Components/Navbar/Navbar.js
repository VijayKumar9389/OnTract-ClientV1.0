import { Link } from 'react-router-dom';

import './Navbar.scss';
import { SiCivicrm } from "react-icons/si";

function Navbar() {


    return (
        <div className='header-home'>
            <div className='heading-wrapper'>
                <div className='sidebar-heading'>
                    <SiCivicrm className='logo' size="3rem" color='#68bd45' />
                    <p>Triton</p>
                    <a>CRM</a>
                </div>
            </div>
            <div className='menu-wrapper'>
                <div className='nav-wrapper'>
                    <ul className='nav-menu'>
                        <Link className='menu-item' to={`/`}><li>Stakeholders</li></Link>
                        <Link className='menu-item' to={`/Records`}><li>Records</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;