const getYieldForPlant = (item) => item.yield;

const getYieldForCrop = function (item) {
  //   console.log(typeof item);
  //   console.log(Object.entries(item));
  return item.crop.yield * item.numCrops;
};

const getTotalYield = function (item) {
  //   console.log(Object.entries(item));
  //   console.log(item.crops[0].crop.yield);
  const resultArray = item.crops.map((element) => {
    // console.log(element);
    // console.log(element.numCrops);
    return element.crop.yield * element.numCrops;
  });
  //   console.log(resultArray);
  return resultArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
};

// bereken de kosten voor een crop: getCostsForCrop
// 1. schrijf één of meerdere tests voor "bereken de kosten voor een crop"
// 2. draai de nieuwe tests en check dat ze falen (rood)
// 3. schrijf code om alle tests (inclusief deze nieuwe) te laten slagen (groen)
// 4. verbeter de code zodat deze er netjes uit ziet (refactor)
// 5. commit je code
// 6. terug naar stap 1 met het volgende stukje functionaliteit

const getCostsForCrop = function (item) {
  // console.log(item);
  return item.crop.costs * item.numCrops;
};

const getRevenueForCrop = function (item) {
  // console.log(item);
  let totalYield = item.crop.yield * item.numCrops;
  return totalYield * item.salePrice;
};

const getProfitForCrop = function (item){
  totalYield = item.crop.yield * item.numCrops;
  let totalRevenue = totalYield * item.salePrice;
  let totalCosts = item.crop.costs * item.numCrops;
  return totalRevenue - totalCosts;
}

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
};
