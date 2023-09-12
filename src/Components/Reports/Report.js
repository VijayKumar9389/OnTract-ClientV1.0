import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

import './Report.scss';

function Report() {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const tblFilter = useSelector((state) => state.filter.value);
    const project = Cookies.get('project');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/report/${project}`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));
    }, [project]);

    function checkActive(num) {
        if (tblFilter !== num) {
            return ('report-item');
        } else {
            return ('report-item-active');
        }
    }

    return (
        <div className='report-wrapper'>
            <div className={checkActive(0)}>
                <div className='report-item-wrapper'>
                    <p>TOTAL</p>
                    <label>{data.total}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.total / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(1)}>
                <div className='report-item-wrapper'>
                    <p>CONTACTED</p>
                    <label>{data.contacted}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.contacted / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(2)}>
                <div className='report-item-wrapper'>
                    <p>REMAINING</p>
                    <label>{data.remaining}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.remaining / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(3)}>
                <div className='report-item-wrapper'>
                    <p>SINGLE-TRACT</p>
                    <label>{data.single}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.single / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(4)}>
                <div className='report-item-wrapper'>
                    <p>MULTI-TRACT</p>
                    <label>{data.multi}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.multi / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(5)}>
                <div className='report-item-wrapper'>
                    <p>MISSING PHONE</p>
                    <label>{data.missingPhone}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.missingPhone / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(5)}>
                <div className='report-item-wrapper'>
                    <p>ATTEMPTED</p>
                    <label>{data.attempted}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.attempted / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(5)}>
                <div className='report-item-wrapper'>
                    <p>NO ATTEMPTS</p>
                    <label>{data.noAttempts}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.noAttempts / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(5)}>
                <div className='report-item-wrapper'>
                    <p>CONSULTED</p>
                    <label>{data.consulted}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.consulted / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(5)}>
                <div className='report-item-wrapper'>
                    <p>NOT CONSULTED</p>
                    <label>{data.notConsulted}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.notConsulted / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(5)}>
                <div className='report-item-wrapper'>
                    <p>DELIVERYS</p>
                    <label>{data.deliverySceduled}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.deliverySceduled / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={checkActive(5)}>
                <div className='report-item-wrapper'>
                    <p>NO DELIVERYS</p>
                    <label>{data.deliveryNotScheduled}</label>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: `${(data.deliveryNotScheduled / data.total) * 100}%` }}></div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Report;