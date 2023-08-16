import axios from "axios";

export function getLocations() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stakeholders/sidebar/locations`, {
        headers: {
            "access-token": localStorage.getItem("access-token"),
        },
    })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

