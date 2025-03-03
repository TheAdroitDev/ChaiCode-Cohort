function addCarColor(car, color) {
    if (!color) {
      return "Invalid color";
    } 
    car.color = color; // Add the color property to the car object
    return car;
  }
  