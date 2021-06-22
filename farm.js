const getYieldForPlant = function (item, factor) {
  console.log(item.factors.sun.high);
  if (!factor) {
    return item.yield;
  }
  let sun;
  if (item.factors.sun) {
    switch (factor.sun) {
      case "low":
        sun = (100 + item.factors.sun.low) / 100;
        break;
      case "medium":
        sun = (100 + item.factors.sun.medium) / 100;
        break;
      case "high":
        sun = (100 + item.factors.sun.high) / 100;
        break;
    }
  } else {
    sun = 1;
  }
  return item.yield * sun;
};

const getYieldForCrop = function (item) {
  //   console.log(typeof item);
  //   console.log(Object.entries(item));
  return item.crop.yield * item.numCrops;
};

const getTotalYield = function (item) {
  //   console.log(Object.entries(item));
  //   console.log(item.crops[0].crop.yield);
  const resultYieldArray = item.crops.map((element) => {
    // console.log(element);
    // console.log(element.numCrops);
    return element.crop.yield * element.numCrops;
  });
  //   console.log(resultArray);
  return resultYieldArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
};

const getCostsForCrop = function (item) {
  // console.log(item);
  return item.crop.costs * item.numCrops;
};

const getRevenueForCrop = function (item) {
  // console.log(item);
  let totalYield = item.crop.yield * item.numCrops;
  return totalYield * item.salePrice;
};

const getProfitForCrop = function (item) {
  totalYield = item.crop.yield * item.numCrops;
  let totalRevenue = totalYield * item.salePrice;
  let totalCosts = item.crop.costs * item.numCrops;
  return totalRevenue - totalCosts;
};

const getTotalProfit = function (item) {
  // console.log(Object.entries(item));
  // console.log(item.crops[1].crop.costs);
  const resultProfitArray = item.crops.map((element) => {
    // console.log(element);
    // console.log(element.salePrice);
    totalYield = element.crop.yield * element.numCrops;
    totalRevenue = totalYield * element.salePrice;
    totalCosts = element.crop.costs * element.numCrops;
    return totalRevenue - totalCosts;
  });
  return resultProfitArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
