import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../../Store/Filter';
import axios from 'axios';

import './Report.scss';

function Report() {

    // const [data, setData] = useState([]);
    // const dispatch = useDispatch();
    // const tblFilter = useSelector((state) => state.filter.value);

    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/report`, {
    //         headers: {
    //             "access-token": localStorage.getItem("access-token"),
    //         },
    //     }).then((response) => setData(response.data));
    // }, []);

    // function checkActive(num) {
    //     if (tblFilter !== num) {
    //         return ('report-item');
    //     } else {
    //         return ('report-item-active');
    //     }
    // }

    // return (
    //     <div className='report-container'>
    //         <div className={checkActive(0)} onClick={() => dispatch(change(0))}>
    //             <div className='report-item-wrapper'>
    //                 <p>TOTAL</p>
    //                 <h1>{data.total}</h1>
    //             </div>
    //         </div>
    //         <div className={checkActive(1)}>
    //             <div className='report-item-wrapper' onClick={() => dispatch(change(1))}>
    //                 <p>CONTACTED</p>
    //                 <h1>{data.contacted}</h1>
    //             </div>
    //         </div>
    //         <div className={checkActive(2)} onClick={() => dispatch(change(2))}>
    //             <div className='report-item-wrapper'>
    //                 <p>REMAINING</p>
    //                 <h1>{data.remaining}</h1>
    //             </div>
    //         </div>
    //         <div className={checkActive(3)} onClick={() => dispatch(change(3))}>
    //             <div className='report-item-wrapper'>
    //                 <p>SINGLE-TRACT</p>
    //                 <h1>{data.single}</h1>
    //             </div>
    //         </div>
    //         <div className={checkActive(4)} onClick={() => dispatch(change(4))}>
    //             <div className='report-item-wrapper'>
    //                 <p>MULTI-TRACT</p>
    //                 <h1>{data.multi}</h1>
    //             </div>
    //         </div>
    //         <div className={checkActive(5)}>
    //             <div className='report-item-wrapper' onClick={() => dispatch(change(5))}>
    //                 <p>MISSING PHONE</p>
    //                 <h1>{data.missingPhone}</h1>
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default Report;