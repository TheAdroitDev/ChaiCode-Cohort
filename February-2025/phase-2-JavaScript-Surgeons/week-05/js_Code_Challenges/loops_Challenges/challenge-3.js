// You just need to implement the countBoxes function
function countBoxes(totalBars, barsPerBox) {
    let boxesneed = 0;
    while(totalBars >= barsPerBox){
        boxesneed++;
        totalBars -= barsPerBox;
    }
    return boxesneed
}