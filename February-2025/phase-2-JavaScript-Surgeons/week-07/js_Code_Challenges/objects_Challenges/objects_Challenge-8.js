function cleanObject(obj) {
    let cleanedObj = {};
  
    for (let key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        cleanedObj[key] = obj[key];
      }
    }
  
    return cleanedObj;
  }
  