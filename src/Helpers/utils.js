//Master Table Functions

//determine if Tract has any stakeholders the match the filter 
export function verifyCluster(cluster, Filters) {

    var print = [];

    for (let i = 0; i < cluster.length; i++) {
        print.push(Filter(cluster[i], Filters));
    }

    if (print !== true) {
        return true;
    } else {
        return false;
    }

}

//use this method to determine if a row is valid
export function Filter(stakeholder, Filters) {

    console.log(stakeholder);

    switch (Filters) {
        case 1:
            return checkContactStatus(stakeholder.CONTACTED, "YES");

        case 2:
            return checkContactStatus(stakeholder.CONTACTED, "NO");

        // case 3:
        //     if (arr.length <= 1) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        // case 4:
        //     if (arr.length > 1) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        case 5:
            return checkNum(stakeholder.PHONE);

        default:
            return true;
    }
}

//Check phone number
export function checkNum(phoneNo) {
    if (phoneNo.length === 0) {
        return true;

    } else {
        return false;
    }
}

//Filter contacted and non-contacted stakeholders
export function checkContactStatus(contactStatus, filter) {
    if (filter === 'YES') {
        if (contactStatus === 'YES') {
            return true;
        } else {
            return false;
        }
    }
    if (filter !== 'YES') {

        if (contactStatus !== 'YES') {
            return true;
        } else {
            return false;
        }
    }
}

//check the Tract number by typing
export function serachTract(tractNo, Search) {

    if (Search === '') {
        return true;
    }

    if (tractNo === Number(Search)) {
        return true;
    }

    return false;
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

    if(stakeholderLocation.length < 3){
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

export function searchName(name, inputTxt) {
    if (inputTxt === '') {
        return true;
    }
    if (name.includes(inputTxt.toLowerCase())) {
        return true;
    }
    return false;
}

export function checkTableFilter(filter, stakeholder) {
    switch (filter) {
        case 0:
            return true;

        case 1:
            return checkContactStatus(stakeholder.CONTACTED, 'YES');

        case 2:
            return checkContactStatus(stakeholder.CONTACTED, '');

        case 3:
            return checkCount(stakeholder.count, true);

        case 4:
            return checkCount(stakeholder.count, false);

        case 5:
            return checkPhoneNo(stakeholder.PHONE)
    }
}
