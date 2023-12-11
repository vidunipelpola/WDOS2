// For the Hotel Booking form

// Referring the DOM elements
const hotelBooking = document.getElementById("hotelForm");
const fullName = document.getElementById("fullNameInput");
const phoneNumber = document.getElementById("phoneNumInput");
const email = document.getElementById("emailInput");
const numOfAdults = document.getElementById('adultsInput');
const numOfKids = document.getElementById('kidsInput');
const numOfSmallKids = document.getElementById('smallKidsInput');
const singleRooms = document.getElementById("singleInput");
const doubleRooms = document.getElementById("doubleInput");
const tripleRooms = document.getElementById("tripleInput");
const checkIn = document.getElementById('checkInInput');
const numOfDays = document.getElementById('daysInput');
const promoCode = document.getElementById('promoCodeInput');
const bookButton = document.getElementById('bookBtn');
const addToFavButton = document.getElementById('favBtn');
const checkLoyalty = document.getElementById('loyaltyBtn');
const costText = document.getElementById('currentCost');
const overallCostText = document.getElementById('overallCost');
const loyaltyText = document.getElementById('loyalty');
const anExtraBed = document.getElementById('extraBed');
const poolView = document.getElementById('poolView');
const gardenView = document.getElementById('gardenView');
const wifi = document.getElementById('wifi');
const detailsParagraph = document.getElementById("details");

// Adding event listeners
bookButton.addEventListener('click', () =>{
    if(validateForm()){ // This is so that the booking is made only if the form has all the necessary input
        bookStay();// Triggers the book function, once all the necessary fields are filled out
        updateTotalCost();
    }
});
addToFavButton.addEventListener('click', () =>{
    if(validateForm()){ // This is so that the booking is made only if the form has all the necessary input
       addToFavourites();// Triggers the book function, once all the necessary fields are filled out
        
    }
});
addToFavButton.addEventListener('click', addToFavourites); // Triggers a function that uses local storage to add a particular booking to favourites
checkLoyalty.addEventListener('click', checkLoyaltyPoints); // Triggers a function that allows the user to check how many loyalty points they hae

// The input fields that are going to trigger a function that changes the cost displayed in the form
singleRooms.addEventListener('input', updateCost);
doubleRooms.addEventListener('input', updateCost);
tripleRooms.addEventListener('input', updateCost);

numOfAdults.addEventListener('input', updateCost);
numOfKids.addEventListener('input', updateCost);
numOfDays.addEventListener('input', updateCost);
anExtraBed.addEventListener('input', updateCost);
promoCode.addEventListener('input', updateCost);
let totalRoomsBooked = 0;


function updateCost() {// This function updates the amount the current booking in progress will cost, according to the changes made in the input fields
    console.log("Cost Updated");

    //Declaring the values of each room unit
    const singleRoomCost = 25000;
    const doubleRoomCost = 35000;
    const tripleRoomCost = 40000;
    const overFiveCost = 5000;
    const extraBedCost = 8000;

    const promoCodeValue = "Promo123";

    // Processing the number of units, so that the cost can be multiplied accordingly   
    const numSingleRooms = parseInt(singleRooms.value) || 0;
    const numDoubleRooms = parseInt(doubleRooms.value) || 0;
    const numTripleRooms = parseInt(tripleRooms.value) || 0;
    const numAdults = parseInt(numOfAdults.value) || 0;
    const numKids = parseInt(numOfKids.value) || 0;
    const numDays = parseInt(numOfDays.value) || 1;
    const hasExtraBed = document.getElementById('extraBed').checked;
    const enteredPromoCode = promoCode.value;
    let discount = 0;

    //Entering the calculation for the booking cost
    let totalCost =
        ((numSingleRooms * singleRoomCost +
            numDoubleRooms * doubleRoomCost +
            numTripleRooms * tripleRoomCost +
            (numAdults + numKids) * overFiveCost) * numDays);
    
    if (hasExtraBed) {
        totalCost += extraBedCost * numDays;
    }
    
    if (enteredPromoCode === promoCodeValue) {
        discount = totalCost * 0.05;
    }
    
    totalCost -= discount; // Subtract the discount from the total cost
    
    costText.innerText = `LKR ${totalCost.toFixed(2)}`;

    //This returns the final value of the cost of the booking, and changes when any updates are made
    return totalCost;
} 

function validateForm() {
    const fullNameValue = fullName.value;
    const phoneNumberValue = phoneNumber.value;
    const emailValue = email.value;
    const checkInDateValue = checkIn.value;
    const numOfDaysValue = parseInt(numOfDays.value) || 0; // Parsing number of days
    const cashPayment = document.getElementById('cash');
    const cardPayment = document.getElementById('card');
    
    if (fullNameValue === "" || phoneNumberValue === "" || emailValue === "" || checkInDateValue === "" || numOfDaysValue <= 0) {
        alert("Please fill in all  fields");
        return false;
    }

    if (!cashPayment.checked && !cardPayment.checked) {
        alert("Please select a payment method");
        return false;
    }
    
    return true;
}
    
let overallCost = 0;

function addToFavourites() {
    const bookingDetails = {
        checkInDate: checkIn.value,
        singleRooms: singleRooms.value,
        doubleRooms: doubleRooms.value || 0,
        tripleRooms: tripleRooms.value || 0,
        adults: numOfAdults.value || 0,
        kids: numOfKids.value || 0,
        smallKids: numOfSmallKids.value || 0,
        wifi: wifi.checked ? 'Yes' : 'No',
        extraBed: anExtraBed.checked ? 'Yes' : 'No',
        poolView: poolView.checked ? 'Yes' : 'No',
        gardenView: gardenView.checked ? 'Yes' : 'No',
        promoCode: promoCode.value,
    };

    alert(`Items saved to favourites`);
    localStorage.setItem('favouriteHotelBooking', JSON.stringify(bookingDetails));

    console.log("added to favourites");
}


function bookStay() {
    if (validateForm()) {
        const fullNameValue = fullName.value;
        const phoneNumberValue = phoneNumber.value;
        const checkInDateValue = checkIn.value;
        const numOfDaysValue = numOfDays.value;
    
        const numSingleRoomsValue = parseInt(singleRooms.value) || 0;
        const numDoubleRoomsValue = parseInt(doubleRooms.value) || 0;
        const numTripleRoomsValue = parseInt(tripleRooms.value) || 0;
        const totalRoomsBooked = numSingleRoomsValue + numDoubleRoomsValue + numTripleRoomsValue;
        const paymentMethod= document.querySelector('input[name="payment"]:checked').value;
    
    // Calculate the cost of the stay
        let cost = updateCost();
    
        const details = `| Name: ${fullNameValue} | Contact No.:${phoneNumberValue} | Rooms Booked: ${totalRoomsBooked} | Check-in Date: ${checkInDateValue} | Days: ${numOfDaysValue} | Payment Method: ${paymentMethod} | Cost: LKR ${cost.toFixed(2)} |`;
    
        if (detailsParagraph.innerText.trim() === '') {
            detailsParagraph.innerText = details;
        } else {
            detailsParagraph.innerText += '/n/n' + details;
        }
    
        overallCost += cost;
    
        overallCostText.innerText = `LKR ${overallCost.toFixed(2)}`;
        costText.innerText = `LKR 0.00`;
        alert(`Thank you for booking your stay, ${fullNameValue}! The price of your booking is LKR ${cost.toFixed(2)}`);
        hotelBooking.reset();
        return cost;
    }
}
    
function checkLoyaltyPoints() {
    console.log("loyaltycheck");
    
    const numSingleRooms = parseInt(singleRooms.value) || 0;
    const numDoubleRooms = parseInt(doubleRooms.value) || 0;
    const numTripleRooms = parseInt(tripleRooms.value) || 0;
    
    const totalRooms = numSingleRooms + numDoubleRooms + numTripleRooms;
    
    let loyaltyPoints = 0;
    
    if (totalRooms > 3) {
        loyaltyPoints = totalRooms * 20;
        console.log(`Awarded ${loyaltyPoints} loyalty points`);
    }
    
    loyaltyText.innerText = `${loyaltyPoints} loyalty points`;
    localStorage.setItem('loyaltyPointsGained', JSON.stringify(loyaltyPointsAccumulated));
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------
    

// For the Adventure Booking Form

//Referring the DOM elements
const adBooking = document.getElementById("adventureForm");
const fullName2 = document.getElementById("fullName2Input");
const phoneNumber2 = document.getElementById("phoneNum2Input");
const email2 = document.getElementById("email2Input");
const localAdults = document.getElementById('localAdultsInput');
const localKids = document.getElementById('localKidsInput');
const foreignAdults= document.getElementById('foreignAdultsInput');
const foreignKids= document.getElementById('foreignKidsInput');
const date = document.getElementById('dayInput');
const surfingAdventure = document.getElementById('surfing');
const whaleAdventure = document.getElementById('whaleWatching');
const divingAdventure = document.getElementById('diving');
const adventureCardNumber = document.getElementById('adventureCardNumInput');
const bookAdventureButton = document.getElementById('bookAdventureBtn');
const showAdventureButton = document.getElementById('showAdventuresBtn');
const addAdventureToFavButton = document.getElementById('adventureFavBtn');
const adventureGuide = document.getElementById('guide');
const numOfHours = document.getElementById('hoursInput');
const currentAdCost = document.getElementById('currentAdventureCost');
const overallAdCostText = document.getElementById('overallAdventureCost');
const adventureDetailsParagraph = document.getElementById('adventureDetails');

//Adding event listeners
showAdventureButton.addEventListener('click', () => {
    if(validateAdventureForm()){
        showAdventures();
    }
});
bookAdventureButton.addEventListener('click', () => {
    if(validateAdventureForm()){
        bookAdventure();
        updateTotalCost();
    }
});
addAdventureToFavButton.addEventListener('click', addAdventureToFavourites);
localAdults.addEventListener('input', updateAdventureCost);
localKids.addEventListener('input', updateAdventureCost);
foreignAdults.addEventListener('input', updateAdventureCost);
foreignKids.addEventListener('input', updateAdventureCost);
adventureGuide.addEventListener('input', updateAdventureCost);
numOfHours.addEventListener('input', updateAdventureCost);


//Defining the functions

let overallAdventureCost = 0;

function updateAdventureCost() {
    const localAdultsCost = 5000;
    const localKidsCost = 2000;
    const foreignAdultsCost = 10000;
    const foreignKidsCost = 5000;
    const hasGuide = adventureGuide.checked;
    const hours = parseInt(numOfHours.value) || 1;

    const numOfLocalAdults = parseInt(localAdults.value) || 0;
    const numOfLocalKids = parseInt(localKids.value) || 0;
    const numOfForeignAdults = parseInt(foreignAdults.value) || 0;
    const numOfForeignKids = parseInt(foreignKids.value) || 0;

    let totalAdventureCost =
        (numOfLocalAdults * localAdultsCost +
        numOfLocalKids * localKidsCost +
        numOfForeignAdults * foreignAdultsCost +
        numOfForeignKids * foreignKidsCost) * hours;

    if (hasGuide) {
        totalAdventureCost +=
            numOfLocalAdults * 1000 +
            numOfForeignAdults * 1000 +
            numOfLocalKids * 500 +
            numOfForeignKids * 500;
    }

    if (isNaN(totalAdventureCost)) {
        return 0; // Return 0 if the calculation results in NaN
    }

    currentAdCost.innerText = `LKR ${totalAdventureCost.toFixed(2)}`;
    return totalAdventureCost;
}


function validateAdventureForm(){
    const fullName2Value = fullName2.value;
    const phoneNumber2Value = phoneNumber2.value;
    const email2Value = email2.value;
    const dateValue = date.value;
    const numOfHoursValue = parseInt(numOfHours.value) || 0; // Parsing the number of hours
    const adCash = document.getElementById('adventureCash');
    const adCard = document.getElementById('adventureCard');
    const adSurfing = document.getElementById('surfing');
    const adWhale = document.getElementById('whaleWatching');
    const adDiving = document.getElementById('diving');

    if (fullName2Value === "" || phoneNumber2Value === "" || email2Value === "" || dateValue === "" || numOfHoursValue <= 0) {
        alert("Please fill in all  fields");
        return false;
    }

    if (!adCash.checked && !adCard.checked) {
        alert("Please select a payment method");
        return false;
    }

    if (!adSurfing.checked && !adWhale.checked && !adDiving.checked) {
        alert("Please select an adventure");
        return false;
    }

    return true;
}

function addAdventureToFavourites() {
    console.log("Added adventure to favourites");
        const adBookingDetails = {
            adDate: dayInput.value,
            locAdults: localAdults.value || 0,
            locKids: localKids.value || 0,
            forAdults: foreignAdults.value || 0,
            forKids: foreignKids.value || 0,
            surfing: surfing.checked ? 'Yes' : 'No',
            whalewatching: whaleWatching.checked ? 'Yes' : 'No',
            diving: diving.checked ? 'Yes' : 'No',
        };
    
        alert(`Items saved to favourites`);
        localStorage.setItem('favouriteHotelBooking', JSON.stringify(adBookingDetails));
    
        console.log("Items added to favourites");
}

function bookAdventure() {
        if (validateAdventureForm()) {
            const chosenAdventure = document.querySelector('input[name="adventures"]:checked').value;
            const fullName2Value = fullName2.value;
            const adCost = updateAdventureCost();
    
            overallAdventureCost += adCost;
    
            overallAdCostText.innerText = `LKR ${overallAdventureCost.toFixed(2)}`;
    
            alert(`Thank you for booking ${chosenAdventure}, ${fullName2Value}! The cost of your booking is LKR ${adCost.toFixed(2)}`);
            currentAdCost.innerText = 'LKR 0.00';
            adventureDetailsParagraph.innerText="";    
            adBooking.reset();
            return overallAdventureCost;
        }
}
    

function showAdventures(){
    if (validateAdventureForm()) {
        updateAdventureCost(); // Calculate the adventure cost
    
        const fullName2Value = fullName2.value;
        const phoneNumber2Value = phoneNumber2.value;
        const dateValue = date.value;
        const numOfHoursValue = numOfHours.value;

        const numOfLocalAdults = parseInt(localAdults.value) || 0;
        const numOfLocalKids = parseInt(localKids.value) || 0;
        const numOfForeignAdults = parseInt(foreignAdults.value) || 0;
        const numOfForeignKids = parseInt(foreignKids.value) || 0;
    
        const overallPeople = numOfLocalAdults + numOfForeignAdults + numOfLocalKids + numOfForeignKids;
    
        const paymentMethodAdventure = document.querySelector('input[name="adventurePayment"]:checked').value;
        const chosenAdventure = document.querySelector('input[name="adventures"]:checked').value;
    
        // Retrieve the current adventure cost from the displayed text
        let currentCost = parseFloat(currentAdCost.innerText.split(' ')[1]);
    
        const adventureDetails = `| Name: ${fullName2Value} | Contact No.: ${phoneNumber2Value} | Adventure: ${chosenAdventure} | Date: ${dateValue} | Hours: ${numOfHoursValue} | Persons: ${overallPeople} | Payment Method: ${paymentMethodAdventure} | Cost: LKR ${currentCost.toFixed(2)} |`;
    
        if (adventureDetailsParagraph.innerText.trim() === '') {
            adventureDetailsParagraph.innerText = adventureDetails;
        } else {
            adventureDetailsParagraph.innerText += '/n/n' + adventureDetails;
        }
    }
}

function updateTotalCost() {
    const hotelCost = overallCost || 0; // If overallCost is undefined, set it to 0
    const adventureCost = overallAdventureCost || 0; // If overallAdventureCost is undefined, set it to 0
    const totalCost = hotelCost + adventureCost;
    const addedCostParagraph = document.getElementById('addedCost');

    if (addedCostParagraph) {
        addedCostParagraph.innerText = `Total Cost: LKR ${totalCost.toFixed(2)}`;
    }
}

