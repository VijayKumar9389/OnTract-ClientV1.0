import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import './Report.scss';

function Report() {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const tblFilter = useSelector((state) => state.filter.value);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/report`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));
    }, []);

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
    </div>
  </div>
  <div className={checkActive(1)}>
    <div className='report-item-wrapper'>
      <p>CONTACTED</p>
      <label>{data.contacted}</label>
    </div>
  </div>
  <div className={checkActive(2)}>
    <div className='report-item-wrapper'>
      <p>REMAINING</p>
      <label>{data.remaining}</label>
    </div>
  </div>
  <div className={checkActive(3)}>
    <div className='report-item-wrapper'>
      <p>SINGLE-TRACT</p>
      <label>{data.single}</label>
    </div>
  </div>
  <div className={checkActive(4)}>
    <div className='report-item-wrapper'>
      <p>MULTI-TRACT</p>
      <label>{data.multi}</label>
    </div>
  </div>
  <div className={checkActive(5)}>
    <div className='report-item-wrapper'>
      <p>MISSING PHONE</p>
      <label>{data.missingPhone}</label>
    </div>
  </div>
</div>

    );
}

export default Report;