// You just need to implement the getDayOfWeek function
function getDayOfWeek(day) {
    // Return the corresponding day of the week based on the input number
    switch (day) {
        case 1: return 'Sunday'; case 2: return 'Monday'; case 3: return 'Tuesday'; case 4: return 'Wednesday'; case 5: return 'Thursday'; case 6: return 'Friday'; case 7: return 'Saturday'; 
        default: return 'Invalid Day';
    }
}
console.log(getDayOfWeek(7));

