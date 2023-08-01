import './StakeholderMobileRow.scss';
import { useNavigate } from 'react-router-dom';

import { checkNum } from '../../Helpers/utils';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { FaPhoneSlash } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { AiOutlineArrowUp } from "react-icons/ai";
import React from 'react'

const StakeholderMobileRow = ({ stakeholder }) => {
    const nav = useNavigate();

    function selectStakeholder(stakeholder) {
        window.scrollTo(0, 0);
        nav(`/${stakeholder.NAME}`, {
            state: {
                stakeholder: stakeholder,
            },
        });
    }

    function getInterestList(array) {
        const listItems = [];

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            listItems.push(<li key={index}>{element.NAME}</li>);
        }

        // return <ul className="interest-list">{listItems}</ul>;

        return listItems.length;
    }

    let location = stakeholder.MAILING.split(",");
    let attemps = stakeholder.ATTEMPTS.split(",");

    console.log(stakeholder);

    return (
        <li className='stakeholder-list-item' onClick={() => selectStakeholder(stakeholder)}>
            <h3>{stakeholder.NAME}</h3>

            <label>{location.length >= 3 ? location[location.length - 3] : "N/A"}, {location.length >= 3 ? location[location.length - 2] : "N/A"}</label>

            <p>
                Affiliated Tracts:&nbsp; <span className="list-item">{stakeholder.count}</span>
                <span className="separator">|</span>
                Contact Status:&nbsp; <span className="list-item">{stakeholder.CONTACT}</span>
                <span className="separator">|</span>
                Number Available:&nbsp; <span className="list-item">{!checkNum(stakeholder.PHONE) ? "Yes" : "No"}</span>
                <span className="separator">|</span>
                Attempts:&nbsp; <span className="list-item">{attemps[0] !== '' ? attemps.length : 0}</span>
                <span className="separator">|</span>
                Contacted:&nbsp; <span className="list-item">{stakeholder.CONTACTED === 'YES'? "Yes" : "No"}</span>
            </p>



        </li>
    );
}

export default StakeholderMobileRow