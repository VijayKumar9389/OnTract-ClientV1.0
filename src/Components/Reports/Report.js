import './Report.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { BsPersonXFill } from 'react-icons/bs';
import { BsFillPersonDashFill } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';

function Report({ setFilter, Filter }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/report`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));
    }, []);

    function checkActive(num){
        if (Filter !== num) {
            return ('report-item');
        } else {
            return ('report-item-active');
        }
    }

    return (
        <div className='report-container'>
{console.log(data)}
                <div className={checkActive(0)} onClick={() => setFilter(0)}>
                    <div className='report-item-wrapper'>
                        <p>TOTAL</p>
                        <h1>{data.total}</h1>
                    </div>
                </div>
                <div className={checkActive(1)}>
                    <div className='report-item-wrapper' onClick={() => setFilter(1)}>
                        <p>CONTACTED</p>
                        <h1>{data.contacted}</h1>
                    </div>
                </div>
                <div className={checkActive(2)} onClick={() => setFilter(2)}>
                    <div className='report-item-wrapper'>
                        <p>REMAINING</p>
                        <h1>{data.remaining}</h1>
                    </div>
                </div>
                <div className={checkActive(3)} onClick={() => setFilter(3)}>
                    <div className='report-item-wrapper'>
                        <p>SINGLE-TRACT</p>
                        <h1>{data.single}</h1>
                    </div>
                </div>
                <div className={checkActive(4)} onClick={() => setFilter(4)}>
                    <div className='report-item-wrapper'>
                        <p>MULTI-TRACT</p>
                        <h1>{data.multi}</h1>
                    </div>
                </div>
                <div className={checkActive(5)}>
                    <div className='report-item-wrapper' onClick={() => setFilter(5)}>
                        <p>MISSING PHONE</p>
                        <h1>{data.missingPhone}</h1>
                    </div>
                </div>
        </div>
    );
}

export default Report;