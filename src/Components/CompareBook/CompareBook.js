import { useState } from 'react';
import axios from 'axios';

import './CompareBook.css';

function CompareBook() {

    const [file, setFile] = useState();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadImage = () => {

        const form = new FormData();
        form.append('image', file);

        axios({
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/tracts/excel/compare`,
            data: form,
            headers: { "Content-Type": "multipart/form-data",  "x-access-token": localStorage.getItem("x-access-token")},
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <div className='compare-container'>
            <input className='file-input' type="file" onChange={saveFile} />
            <button onClick={() => uploadImage()}>Upload</button>
        </div>
    )

}

export default CompareBook;