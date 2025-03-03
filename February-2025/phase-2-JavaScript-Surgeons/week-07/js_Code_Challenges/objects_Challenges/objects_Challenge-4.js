// You just need to implement the removePassword function
function removePassword(user) {
    // Remove password property
    if(user.hasOwnProperty("password")){
      delete user.password
      return user;
    }
    else{
      return user
    }
  }