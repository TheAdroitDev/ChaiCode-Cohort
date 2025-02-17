// You just need to implement the totalStars function
function totalStars(starLevels) {
    let countedStars = 0;

    for(let i = 0; i < starLevels.length; i++){
        countedStars += starLevels[i].length
    }
    return countedStars;
}
