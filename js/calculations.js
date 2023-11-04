let UKPound = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});
function calcBid() {
    let carValue = 0;
    let buyerPrem = 0;
    carValue = document.getElementById('carValue').value;
    buyerPrem = document.getElementById('buyerPrem').value;
    let prem = ((buyerPrem * 1.2)/100)+1;
    console.log(prem);
    document.getElementById('price').innerHTML = UKPound.format(carValue * prem);
    document.getElementById('buyprem').innerHTML = UKPound.format((carValue * prem) - carValue);
}

function ACA() {
    //
}

function mathewsons() {
    //
}

function countingcars() {
    //
}

function other() {
    //
}