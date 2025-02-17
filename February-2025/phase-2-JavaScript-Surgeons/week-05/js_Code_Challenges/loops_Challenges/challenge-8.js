// You just need to implement the totalPrice function
function totalPrice(prices) {
  let totalCost =0 ;

  for(let i =0; i < prices.length; i++){
    totalCost += prices[i];
  }

  return totalCost
}
