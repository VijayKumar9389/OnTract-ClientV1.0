import './TractIndex.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TractIndex({ tractNO, isOpen }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/sidebar/locations`, {
            headers: {
                "access-token": localStorage.getItem("access-token"),
            },
        }).then((response) => setData(response.data));
    }, []);

    const open = {
        right: '0'
    };

    const closed = {
        right: '-500px'
    };

    return (
        <div className='index-container'>

        </div>
    )

}

export default TractIndex;