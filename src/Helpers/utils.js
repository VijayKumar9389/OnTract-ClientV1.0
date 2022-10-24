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
export function checkLocation(Name, Address, Location) {

    var stakeholderLocation = Address.split(',');
    var stakeholderProvince = stakeholderLocation[stakeholderLocation.length - 2];
    var stakeholderCity = stakeholderLocation[stakeholderLocation.length - 3];
    var location = { province: stakeholderProvince, city: stakeholderCity };


    if (Location.province === 'MISSING') {
        if (stakeholderLocation.length < 3) {
            return true;
        }
        if (Address === '') {
            return true;
        }
    }

    if (Location.province === null && Location.city === null) {
        return true
    }

    if (stakeholderLocation.length < 3) {
        return false;
    }

    if (Address !== '') {

        if (Location.province !== null && Location.city === null) {
            if (location.province.includes(Location.province)) {
                return true;
            }
        }


        if (Location.province !== null && Location.city !== null) {
            if (location.province.includes(Location.province) && location.city.includes(Location.city)) {
                return true;
            }
        }
    }

    else return false;
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
        console.log(stakeholder.NAME)
        if (filter.search.type == 0) {
            if (searchName(stakeholder.NAME.toLowerCase(), filter.search.txt)) {
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



