import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Filter } from '../../../Helpers/utils';

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

function MasterRow({ stakeholders, index }) {

    const nav = useNavigate();
    const tblSearch = useSelector((state) => state.search.value);
    const Location = useSelector((state) => state.location.value);
    const tblFilter = useSelector((state) => state.filter.value);

    function selectStakeholder(stakeholderInfo) {
        window.scrollTo(0, 0);
        nav(`/${stakeholderInfo.NAME}`, {
            state: {
                stakeholder: stakeholderInfo
            }
        });
    }

    function checkTableFilter(arr) {
        switch (tblFilter) {
            default:
                return true;

            case 3:
                if (arr.length <= 1) {
                    return true;
                } else {
                    return false;
                }

            case 4:
                if (arr.length > 1) {
                    return true;
                } else {
                    return false;
                }
        }
    }

    function getContactStatus(contactStatus) {
        if (contactStatus === 'YES') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            {index > 0 || Number(tblSearch) === stakeholders[0].TRACT ? <div className='master-spacer'></div> : null}

            {stakeholders.map((stakeholder, index) => {

                let location = stakeholder.MAILING.split(",");

                return (
                    <tr key={index} className={Filter(stakeholder, tblFilter) ? 'active-tr' : 'nonactive-tr'} onClick={() => selectStakeholder(stakeholder)}>
                        <td>{stakeholder.TRACT}</td>
                        <td>{stakeholder.NAME}</td>
                        <td>{stakeholder.CONTACT}</td>
                        <td>{location.length >= 3 ? location[location.length - 2] : 'MISSING'}</td>
                        <td>{location.length >= 3 ? location[location.length - 3] : 'MISSING'}</td>
                        <td>{stakeholder.ATTEMPTS}</td>
                        <td>{getContactStatus(stakeholder.CONTACTED) ? <MdOutlineCheck size='2rem' color='#407945' /> : <MdOutlineClose size='2rem' color='#a4484c' />}</td>
                        <td><MdKeyboardArrowRight size='1.5rem' color='grey' /></td>
                    </tr>
                );
            })}
        </>
    );
}

export default MasterRow;
