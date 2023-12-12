// For the Hotel Booking form

// Referring the DOM elements of the Hotel Booking
const hotelBooking = document.getElementById("hotelForm"); //This is the id of the form, assigned so that it can be reset easily
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
        updateTotalCost();// This updates the total cost of both the hotel and adventure bookings, at the bottom of the page
    }
});
addToFavButton.addEventListener('click', () =>{
    if(validateForm()){ // This is so that favourites can be added only if all details are given
       addToFavourites();// Triggers a function that uses local storage to add a particular booking's input to favourites        
    }
});
checkLoyalty.addEventListener('click', checkLoyaltyPoints); // Triggers a function that allows the user to check how many loyalty points they have, depending on the number of rooms booked

// The input fields that are going to trigger a function that changes the cost displayed in the form
singleRooms.addEventListener('input', updateCost);
doubleRooms.addEventListener('input', updateCost);
tripleRooms.addEventListener('input', updateCost);

numOfAdults.addEventListener('input', updateCost);
numOfKids.addEventListener('input', updateCost);
numOfDays.addEventListener('input', updateCost);
anExtraBed.addEventListener('input', updateCost);
promoCode.addEventListener('input', updateCost);

function updateCost() {// This function updates the amount the current booking that is in progress will cost, according to the changes made in the input fields

    //Declaring the values of each room unit
    const singleRoomCost = 25000;
    const doubleRoomCost = 35000;
    const tripleRoomCost = 40000;
    const overFiveCost = 5000;
    const extraBedCost = 8000;

    const promoCodeValue = "Promo123";// If the user enters this code in the input field for the promo code, they will be given a discount

    // Processing the number of units, so that the cost can be multiplied accordingly   
    const numSingleRooms = parseInt(singleRooms.value) || 0;
    const numDoubleRooms = parseInt(doubleRooms.value) || 0;
    const numTripleRooms = parseInt(tripleRooms.value) || 0;
    const numAdults = parseInt(numOfAdults.value) || 0;
    const numKids = parseInt(numOfKids.value) || 0;
    const numDays = parseInt(numOfDays.value) || 1;
    const hasExtraBed = document.getElementById('extraBed').checked;
    const enteredPromoCode = promoCode.value;
    let discount = 0;// This is the discount that will change depending on whether or not the right promo code is entered

    //Entering the calculation for the booking cost
    let totalCost =
        ((numSingleRooms * singleRoomCost +
            numDoubleRooms * doubleRoomCost +
            numTripleRooms * tripleRoomCost +
            (numAdults + numKids) * overFiveCost) * numDays);
    
    if (hasExtraBed) {// This will add an extra amount to the cost if the option to get an extra bed is selected
        totalCost += extraBedCost * numDays;
    }
    
    if (enteredPromoCode === promoCodeValue) {// This will reduce 5% from the cost if 'Promo123' is typed in
        discount = totalCost * 0.05;
    }
    
    totalCost -= discount; // Subtract the discount from the total cost
    
    costText.innerText = `LKR ${totalCost.toFixed(2)}`;// This dynamically changes the cost of the current booking, depending on the changes made in input fields like the rooms, nmber of people, or number of days

    //This returns the final value of the cost of the booking, and changes when any updates are made
    return totalCost;
} 

function validateForm() {//This the function used to ensure that the user enters the correct input, and has filled out all fields required for a booking to be made
    const fullNameValue = fullName.value;
    const phoneNumberValue = phoneNumber.value;
    const emailValue = email.value;
    const checkInDateValue = checkIn.value;
    const numOfDaysValue = parseInt(numOfDays.value) || 0;// This shows that the number of days should be taken as 0 if the user hasn
    const cashPayment = document.getElementById('cash');
    const cardPayment = document.getElementById('card');
    
    if (fullNameValue === "" || phoneNumberValue === "" || emailValue === "" || checkInDateValue === "" || numOfDaysValue <= 0) {// This raises an alert if any booking detail has not been filled
        alert("Please fill in all fields");
        return false;// This doesn't allow the form to be submitted, or details added to favourites 
    }

    if (!cashPayment.checked && !cardPayment.checked) {// This is to raise an alert if neither cash nor card has been selected as a payment optiono
        alert("Please select a payment method");
        return false;
    }
    
    return true;// This allows the system to proceed with the booking, and adding its details to favourites
}

function addToFavourites() {// This function saves the details entered in a particular booking to local storage, overwriting any existing favourite
    const bookingDetails = {// This is the constant that the details will be saved as
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
}

function checkLoyaltyPoints() {// The function that checks the number of loyalty points the user will be gaining through the booking they're making
    
    const numSingleRooms = parseInt(singleRooms.value) || 0;
    const numDoubleRooms = parseInt(doubleRooms.value) || 0;
    const numTripleRooms = parseInt(tripleRooms.value) || 0;
    
    const totalRooms = numSingleRooms + numDoubleRooms + numTripleRooms;
    
    let loyaltyPoints = 0;
    
    if (totalRooms > 3) {// If 4 or more rooms are booked, the user gains 20 loyalty points per room booked
        loyaltyPoints = totalRooms * 20;
        localStorage.setItem('numOfLoyaltyPoints', JSON.stringify(loyaltyPoints));// This adds the number of loyalty points gained to the local storage
    }
    loyaltyText.innerText = `${loyaltyPoints} loyalty points`;// This displays the number of loyalty points gained, in a text field
}
    
let overallCost = 0;// This is the variable that contains the cost of all the hotel bookings made so far

function bookStay() {
    if (validateForm()) {// The booking can only be made if the form is validated
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
    
        const details = `| Name: ${fullNameValue} | Contact No.:${phoneNumberValue} | Rooms Booked: ${totalRoomsBooked} | Check-in Date: ${checkInDateValue} | Days: ${numOfDaysValue} | Payment Method: ${paymentMethod} | Cost: LKR ${cost.toFixed(2)} |`; // This displays the user's booking details in a paragraph at the bottom of the webpage
    
        if (detailsParagraph.innerText.trim() === '') {// This is so that no space will be left above if there are no previous bookings were displayed
            detailsParagraph.innerText = details;
        } else {// This is so that the next set of details are displayed before the previous ones, and dont overwrite them
            detailsParagraph.innerText += '\n\n' + details;
        }
    
        overallCost += cost;// This adds the cost of the booking just made to the existing overall cost
    
        overallCostText.innerText = `LKR ${overallCost.toFixed(2)}`;// Changes the displayed overall cost
        costText.innerText = `LKR 0.00`;// Sets the current cost to 0
        alert(`Thank you for booking your stay, ${fullNameValue}! The price of your booking is LKR ${cost.toFixed(2)}`);// Alert that thanks the user for the booking, and displays the name and cost
        hotelBooking.reset();// resets the form, so a new booking can be made
        return cost;// Returns the cost, so it can be added to the total overall cost
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
    

// For the Adventure Booking Form

//Referring the DOM elements of the adventure booking form
const adBooking = document.getElementById("adventureForm");// Gives the adventure form an ID
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
        showAdventures();//if the form is validated(if all necessary fields are filled in correctly), and the show adventure button is clicked, the details of the particular booking are displayed in a text area at the `
    }
});
bookAdventureButton.addEventListener('click', () => {
    if(validateAdventureForm()){
        bookAdventure();//Books the adventure upon validation
        updateTotalCost();//Updates the cost of both hotel and adventure bookings
    }
});

addAdventureToFavButton.addEventListener('click', () => {
    if (validateAdventureForm()) {
        addAdventureToFavourites();// Adds the details of the booking to local storage as a favourite, overwriting any existing favourites
    }
});

//The event listeners that update the current adventure cost 
localAdults.addEventListener('input', updateAdventureCost);
localKids.addEventListener('input', updateAdventureCost);
foreignAdults.addEventListener('input', updateAdventureCost);
foreignKids.addEventListener('input', updateAdventureCost);
adventureGuide.addEventListener('input', updateAdventureCost);
numOfHours.addEventListener('input', updateAdventureCost);


//Defining the functions

let overallAdventureCost = 0;

function updateAdventureCost() {// Updates the current adventure cost when any changes are made to input fields

    // Declaring the constants, that are the prices for each type of individual
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

    let totalAdventureCost = // This is the formula to find the cost of the booking
        (numOfLocalAdults * localAdultsCost +
        numOfLocalKids * localKidsCost +
        numOfForeignAdults * foreignAdultsCost +
        numOfForeignKids * foreignKidsCost) * hours;

    if (hasGuide) {// increases prices if the include guide option is checked
        totalAdventureCost +=
            numOfLocalAdults * 1000 +
            numOfForeignAdults * 1000 +
            numOfLocalKids * 500 +
            numOfForeignKids * 500;
    }

    if (isNaN(totalAdventureCost)) {
        return 0; // Returns 0 if the calculation results in NaN
    }

    currentAdCost.innerText = `LKR ${totalAdventureCost.toFixed(2)}`;//Dynamically changes the cost of the booking, when changes are made to the input fields
    return totalAdventureCost;// returns the value of the adventure cost, to be added to the total overall cost at the end
}


function validateAdventureForm(){// This ensures that all the input fields are filled in correctly before favourites can be added or booked
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
        alert("Please fill in all fields");
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

function addAdventureToFavourites() {//Adds the adventure details currently filled to local storage, overwriting any existing favourite
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
            adventureDetailsParagraph.innerText += '\n\n' + adventureDetails;
        }
    }
}

function updateTotalCost() {// This function is to show the addition of the overall hotel costs and the overall adventure cost
    const hotelCost = overallCost || 0; // If overallCost is undefined, set it to 0
    const adventureCost = overallAdventureCost || 0; // If overallAdventureCost is undefined, set it to 0
    const totalCost = hotelCost + adventureCost;
    const addedCostParagraph = document.getElementById('addedCost');

    if (addedCostParagraph) {
        addedCostParagraph.innerText = `Total Cost: LKR ${totalCost.toFixed(2)}`;
    }
}

