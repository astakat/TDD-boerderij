const getYieldForPlant = function (item, factor) {
  // console.log("item en factor", item, factor);
  // console.log("factor regist", factor);
  if (!factor) {
    return item.yield;
  }
  let sun;
  let wind;
  let soil;
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
      default:
        sun = 1;
    }
  } else {
    sun = 1;
  }
  if (item.factors.wind) {
    switch (factor.wind) {
      case "low":
        wind = (100 + item.factors.wind.low) / 100;
        break;
      case "medium":
        wind = (100 + item.factors.wind.medium) / 100;
        break;
      case "high":
        wind = (100 + item.factors.wind.high) / 100;
        break;
      default:
        wind = 1;
    }
  } else {
    wind = 1;
  }
  if (item.factors.soil) {
    switch (factor.soil) {
      case "sand":
        soil = (100 + item.factors.soil.sand) / 100;
        break;
      case "clay":
        soil = (100 + item.factors.soil.clay) / 100;
        break;
      case "silt":
        soil = (100 + item.factors.soil.silt) / 100;
        break;
      default:
        soil = 1;
    }
  } else {
    soil = 1;
  }
  // console.log("sun, wind, soil", sun, wind, soil);
  const yieldForPlant = item.yield * sun * wind * soil;
  // console.log("result yield for plant", yieldForPlant);
  const resultYieldForPlant = parseFloat(yieldForPlant.toFixed(2));
  return resultYieldForPlant;
};

const getYieldForCrop = function (item, factor) {
  const yieldForCrop = item.crop.yield * item.numCrops;
  if (!factor) {
    return yieldForCrop;
  }
  // console.log(typeof item);
  // console.log(Object.entries(item));
  return yieldForCrop * getYieldForPlant(item.crop, factor);
};

const getTotalYield = function (item, factor) {
  const resultYieldArray = item.crops.map((element) => getYieldForCrop(element, factor));
  console.log("resulting Yield Array:", resultYieldArray);
  const reducedYieldArray = resultYieldArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return parseFloat(reducedYieldArray.toFixed(2));
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
