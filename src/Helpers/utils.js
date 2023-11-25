export function Filter(stakeholder, tblFilter) {
    if (!search(stakeholder, tblFilter)) {
        return false;
    }

    if (!checkLocation(stakeholder, tblFilter)) {
        return false;
    }

    if (!stakeholderType(stakeholder, tblFilter.stakeholder)) {
        return false;
    }

    if (!checkRoute(stakeholder, tblFilter)) {
        return false;
    }

    if (!checkContactStatus(stakeholder.CONTACTED, tblFilter.contacted)) {
        return false;
    }

    if (!checkAttempts(stakeholder.ATTEMPTS, tblFilter.attempted)) {
        return false;
    }

    if (!checkDelivery(stakeholder.LOCATION, tblFilter.delivery)) {
        return false;
    }

    if (!checkConsultation(stakeholder.CONSULTATION, tblFilter.consultation)) {
        return false;
    }

    return true;
}

function checkRoute(stakeholder, filter) {
    if (filter.route !== '') {
        if (stakeholder.ROUTE === filter.route) {
            return true;
        }
        return false;
    }
    else return true;
}

//Filter stakeholders by type
export function stakeholderType(stakeholder, filter) {
    switch (filter) {
        case 0:
            return true;

        //single tract
        case 1:
            return checkCount(stakeholder.count, true);

        //multi tract
        case 2:
            return checkCount(stakeholder.count, false);

        //corperation 
        case 3:
            return checkCorperation(stakeholder.CORPERATION, true);

        case 4:
            return checkCorperation(stakeholder.CORPERATION, false);

        case 5:
            return checkPhoneNo(stakeholder.PHONE)
    }
}

//Check if stakeholder has a phone number 
export function checkNum(phoneNo) {
    if (phoneNo.length === 0) {
        return true;

    } else {
        return false;
    }
}

//Filter contacted and non-contacted stakeholders
export function checkContactStatus(contactStatus, filter) {
    if (filter === null) {
        return true;
    }
    if (filter === true) {
        if (contactStatus === 'YES') {
            return true;
        } else {
            return false;
        }
    }
    if (filter !== true) {

        if (contactStatus !== 'YES') {
            return true;
        } else {
            return false;
        }
    }
}

//filter attempted and not-attempted stakeholders
export function checkAttempts(attempts, filter) {
    if (filter === null) {
        return true;
    }
    if (filter === true) {
        if (attempts.length > 1) {
            return true;
        } else {
            return false;
        }
    }
    if (filter !== true) {
        if (attempts.length < 1) {
            return true;
        } else {
            return false;
        }
    }
}

//check corprate and non corprate stakeholders
export function checkCorperation(corperation, filter) {
    if (filter === true) {
        if (corperation === 'YES') {
            return true;
        } else {
            return false;
        }
    }
    if (filter !== true) {

        if (corperation !== 'YES') {
            return true;
        } else {
            return false;
        }
    }
}

// Filter Location 
export function checkLocation(stakeholder, filter) {
    if (!stakeholder || typeof stakeholder.MAILING !== 'string') {
        return false; // Return false if the stakeholder or the STREET property is missing or not a string
    }

    const stakeholderLocation = stakeholder.MAILING.split(',');
    const stakeholderProvince = stakeholderLocation[stakeholderLocation.length - 2];
    const stakeholderCity = stakeholderLocation[stakeholderLocation.length - 3];
    const location = { province: stakeholderProvince, city: stakeholderCity };


    if (filter.province === '' && filter.city === '') {
        return true;
    }

    if (filter.province === 'MISSING') {
        if (stakeholderLocation.length < 3 || stakeholder.STREET === '') {
            return true;
        }
    }

    if (filter.province !== '') {
        if (filter.province.includes(location.province)) {
            if (filter.city !== '') {
                if (filter.city.includes(location.city)) {
                    return true;
                }
            } else {
                return true;
            }
        }
    }

    return false;
}

//Checks if stakeholder has a phone number 
export function checkPhoneNo(phoneNo) {
    if (phoneNo.length === 0) {
        return true;
    } else {
        return false;
    }
}

//Filter single tracts and multitract stakeholders
export function checkCount(count, single) {
    if (single) {
        if (count === 1) {
            return true;
        } else {
            return false;
        }
    }
    if (!single) {
        if (count > 1) {
            return true;
        } else {
            return false;
        }
    }
}

export function checkDelivery(location, filter) {
    if (filter === null) {
        return true;
    }

    if (filter === true) {
        if (location !== "") {
            return true;
        } else {
            return false;
        }
    }

    if (filter === false) {
        if (location === "") {
            return true;
        } else {
            return false;
        }
    }

}

export function checkConsultation(consultation, filter) {
    if (filter === null) {
        return true;
    }
    if (filter === true) {
        if (consultation !== "") {
            return true;
        } else {
            return false;
        }
    }
    if (filter === false) {
        if (consultation === "") {
            return true;
        } else {
            return false;
        }
    }
}



export function search(stakeholder, filter) {

    if (stakeholder.NAME !== '') {
        if (filter.search.type == 0) {
            if (searchName(stakeholder.NAME.toLowerCase(), filter.search.txt.toLowerCase())) {
                return true
            }
        }
        if (filter.search.type == 1) {
            if (searchNumber(stakeholder.PHONE, filter.search.txt)) {
                return true
            }
        }
        if (filter.search.type == 2) {
            if (searchLocation({ street: stakeholder.STREET, mailing: stakeholder.MAILING }, filter.search.txt)) {
                return true
            }
        }
        if (filter.search.type == 3) {
            if (searchTracts(stakeholder.tracts, filter.search.txt)) {
                return true
            }
        }
    }

    return false;

}


export function searchTracts(tracts, inputTxt) {
    if (inputTxt === '') {
        return true;
    }

    const allTracts = tracts.split(',');

    if (allTracts.includes(inputTxt)) {
        return true;
    }

    return false;
}


export function searchLocation(location, inputTxt) {
    if (!location) {
        // Handle the case where location is undefined
        return false;
    }

    if (inputTxt === '') {
        return true;
    }

    // Combine relevant address properties into a single string
    const fullAddress = [location.street, location.mailing].filter(Boolean).join(', ');

    // Perform case-insensitive search
    const searchText = inputTxt.toLowerCase();
    const fullAddressLowerCase = fullAddress.toLowerCase();

    return fullAddressLowerCase.includes(searchText);
}



export function searchName(name, inputTxt) {

    if (inputTxt === '') {
        return true;
    }
    if (name.includes(inputTxt)) {
        return true;
    }
    return false;
}

export function searchNumber(phoneNo, inputTxt) {


    if (inputTxt === '') {
        return true
    } else {
        var numbers = phoneNo.split(',');

        for (let index = 0; index < numbers.length; index++) {

            var cleanOne = numbers[index].replace('(', '').replace(')', '').replace(/-/g, '');
            var cleanTwo = cleanOne.split(':')

            if (cleanTwo[1] !== undefined && cleanTwo[1].includes(inputTxt)) {
                return true;
            }
        }
        return false;
    }
}



