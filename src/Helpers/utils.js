export function Filter(stakeholder, tblFilter) {
    if (search(stakeholder, tblFilter)) {
        if (checkLocation(stakeholder, tblFilter)) {
            if (stakeholderType(stakeholder, tblFilter.stakeholder)) {
                if (checkRoute(stakeholder, tblFilter)) {
                    if (checkContactStatus(stakeholder.CONTACTED, tblFilter.contacted)) {
                        if (checkAttempts(stakeholder.ATTEMPTS, tblFilter.attempted)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
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
    }

    return false;

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



