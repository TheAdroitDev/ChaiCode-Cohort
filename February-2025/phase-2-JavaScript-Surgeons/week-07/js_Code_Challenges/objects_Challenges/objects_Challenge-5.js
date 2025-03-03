// You just need to implement the countProperties function
function countProperties(user) {
    // Return the number of properties in user
    if(user === ""){
      return 0;
    }
    else{
      return Object.keys(user).length;
    }
  }
  