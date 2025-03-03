// You just need to implement the mergeObjects function
function mergeObjects(obj1, obj2) {
    // Merge obj1 and obj2 into a single object
    if(obj2===""){
      return obj1;
    }
    else if(obj1 === "" && obj2 === ""){
      return {}
    }
    else{
      if(obj1.hasOwnProperty === obj2.hasOwnProperty){
        return {
          ...obj1,
          ...obj2
        }
      }
    }
  }
  