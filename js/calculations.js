let UKPound = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});
function calcBid() {
    //let carValue = 0;
    //let buyerPrem = 0;
    let carValue = document.getElementById('carValue').value;
    let buyerPrem = document.getElementById('buyerPrem').value;
    let prem = "";
    if(findChecked("vat") == "vat") {
        prem = ((buyerPrem * 1.2)/100)+1;
    } else {
        prem = (buyerPrem/100)+1;
    }
    console.log(findChecked("vat"));
    //console.log(getSelected("auctionHouse"));
    document.getElementById('price').innerHTML = UKPound.format(carValue * prem);
    document.getElementById('buyprem').innerHTML = UKPound.format((carValue * prem) - carValue);
}

function calcBidBeta() {
    //let carValue = 0;
    //let buyerPrem = 0;
    let result = [];
    let carValue = document.getElementById('carValue').value;
    let buyerPrem = document.getElementById('buyerPrem').value;
    let prem = "";

    switch(getSelected("auctionHouse")) {
        case "ACA":
            result = ACA(carValue, buyerPrem);
            break;
        case "mathewsons_online":
            result = mathewsons(carValue, buyerPrem, true);
            break;
        case "mathewsons":
            result = mathewsons(carValue, buyerPrem, false);
            break;
        case "collectingcars":
            result = collectingcars(carValue, buyerPrem);
            break;
        case "candc":
            result[0] = carValue * prem;
            result[1] = (carValue * prem) - carValue;
            break;
        case "bonhams":
            result = bonhams(carValue, buyerPrem);
            break;
        case "other":
            break;
    }

    console.log(findChecked("vat"));
    console.log(getSelected("auctionHouse"));
    document.getElementById('price').innerHTML = UKPound.format(result[0]);
    document.getElementById('buyprem').innerHTML = UKPound.format(result[1]);
}

function findChecked(elementName) {
    let radio= document.getElementsByName(elementName);
    let checked = "";
    for(i=0; i<radio.length; i++) {
        if(radio[i].checked)
            checked = radio[i].value;
    }
    return checked;
}

function setBuyerPrem(selectedAuctionHouse) {
    switch (selectedAuctionHouse) {
        case "ACA":
            document.getElementById('buyerPrem').value = 8;
            document.getElementById('buyerPrem').disabled = false;
            break;
        case "mathewsons_online":
        case "mathewsons":
            document.getElementById('buyerPrem').value = 10;
            document.getElementById('buyerPrem').disabled = false;
            break;
        case "collectingcars":
            document.getElementById('buyerPrem').value = 6;
            document.getElementById('buyerPrem').disabled = false;
            break;
        case "candc":
            document.getElementById('buyerPrem').value = 0;
            document.getElementById('buyerPrem').disabled = true;
            break;
        case "bonhams":
            document.getElementById('buyerPrem').value = 7;
            document.getElementById('buyerPrem').disabled = false;
            break;
        default:
            document.getElementById('buyerPrem').disabled = false;
            break;
    }
}

function getSelected(elementName) {
    return document.getElementById(elementName).value;
}

function bonhams(carValue, buyerPrem) {
    //returns array(TOTAL, BUYERS_PREMIUM)
    let ret = [];
    let bpTotal = carValue * buyerPrem;
    let prem = 0;
    if(bpTotal < 700) {
        bpTotal = 700;
    }
    if(findChecked("vat") == "vat") {
        prem = (buyerPrem/100)+1;
    } else {
        prem = ((buyerPrem * 1.2)/100)+1;
    }
    ret[0] = carValue * prem;
    ret[1] = prem;

    return ret;
}

function ACA(carValue, buyerPrem) {
    //returns array(TOTAL, BUYERS_PREMIUM)
    let ret = [];
    let bpTotal = carValue * buyerPrem;
    let prem = 0;
    if(bpTotal < 192) {
        bpTotal = 192;
    }
    if(findChecked("vat") == "vat") {
        prem = (buyerPrem/100)+1;
    } else {
        prem = ((buyerPrem * 1.2)/100)+1;
    }
    ret[0] = carValue * prem;
    ret[1] = prem;

    return ret;
}

function mathewsons(carValue, buyerPrem, online = false) {
    //returns array(TOTAL, BUYERS_PREMIUM)
    let ret = [];
    let online_fee = 0;
    let prem1 = 0;
    let prem2 = 0;
    let prem3 = 0;
    let r = 0;
    let p = 0;

    if(findChecked("vat") == "vat") {
        prem1 = (10/100)+1;
        prem2 = (7.5/100)+1;
        prem3 = (5/100)+1;
    } else {
        prem1 = ((10 * 1.2)/100)+1;
        prem2 = ((7.5 * 1.2)/100)+1;
        prem3 = ((5 * 1.2)/100)+1;
    }

    if (carValue <= 2000) {
        r = carValue * prem1;
    } else if(carValue > 2000 && carValue <= 20000) {
        r = carValue * prem2;
    } else if(carValue > 20000) {
        r = (20000 * prem2) + ((carValue - 20000) * prem3);
    }

    if (online) {
        online_fee = (r - carValue) * 1.21;
        console.log(online_fee);
        console.log(r);
    }

    ret[0] = r + online_fee;
    ret[1] = r - carValue;

    return ret;
}

function collectingcars(carValue, buyerPrem) {
    //returns array(TOTAL, BUYERS_PREMIUM)
    let ret = [];
    let prem = 0;
    if(findChecked("vat") == "vat") {
        prem = (buyerPrem/100)+1;
    } else {
        prem = ((buyerPrem * 1.2)/100)+1;
    }

    ret[0] = carValue * prem;
    ret[1] = prem;

    return ret;
}

function other(carValue, buyerPrem) {
    //returns array(TOTAL, BUYERS_PREMIUM)
    let ret = [];
    let prem = 0;
    if(findChecked("vat") == "vat") {
        prem = (buyerPrem/100)+1;
    } else {
        prem = ((buyerPrem * 1.2)/100)+1;
    }

    ret[0] = carValue * prem;
    ret[1] = prem;

    return ret;
}