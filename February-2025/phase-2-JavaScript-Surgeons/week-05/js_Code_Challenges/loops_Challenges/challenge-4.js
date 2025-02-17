// You just need to implement the totalWater function
function totalWater(waterAmounts) {
  let total = 0;

  for(let i =0; i < waterAmounts.length; i++){
    total += waterAmounts[i]
  }

  return total;
  
}