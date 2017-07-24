function rentalCarCost(d) {
  var cost = d * 40, discount = 0;
  if (d > 6) {
    discount = 50;
  }
  else if (d > 2) {
    discount = 20;
  }
  return cost - discount;
}