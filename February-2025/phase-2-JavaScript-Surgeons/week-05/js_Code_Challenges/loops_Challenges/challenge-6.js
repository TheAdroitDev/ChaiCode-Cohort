// You just need to implement the workingDays function
function workingDays(days) {
    // your code here
    let daysworked = 0;

    for(let i = 0; i < days.length; i++){
        if(days[i] !== "Saturday" && days[i] !== "Sunday"){
            daysworked++
        }
    }
    return daysworked;
}