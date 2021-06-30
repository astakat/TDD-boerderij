// yield for 1 plant, with outside factors if provided:

const getYieldForPlant = function (item, factor) {
  // console.log("item en factor", item, factor);
  // console.log("factor regist", factor);
  if (!factor) {
    return item.yield;
  }
  let sun = 1;
  let wind = 1;
  let soil = 1;
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
    }
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
    }
  }
  // console.log("sun, wind, soil", sun, wind, soil);
  const yieldForPlant = item.yield * sun * wind * soil;
  // console.log("result yield for plant", yieldForPlant);
  // const resultYieldForPlant = parseFloat(yieldForPlant.toFixed(2));
  return yieldForPlant;
};

const getYieldForCrop = function (item, factor) {
  // console.log(typeof item);
  // console.log(Object.entries(item));
  return item.numCrops * getYieldForPlant(item.crop, factor);
};

const getTotalYield = function (item, factor) {
  const resultYieldArray = item.crops.map((element) =>
    getYieldForCrop(element, factor)
  );
  // console.log("resulting Yield Array:", resultYieldArray);
  const reducedYieldArray = resultYieldArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  // return parseFloat(reducedYieldArray.toFixed(2));
  return reducedYieldArray;
};

const getCostsForCrop = function (item) {
  // console.log(item);
  return item.crop.costs * item.numCrops;
};

const getRevenueForCrop = function (item, factor) {
  // console.log(item.crop.salePrice);
  // console.log(item.crop);
  // console.log(item.numCrops);
  const revenueCrop =
    item.numCrops * getYieldForPlant(item.crop, factor) * item.crop.salePrice;
  // console.log(revenueCrop);
  return revenueCrop;
};

const getProfitForCrop = function (item, factor) {
  const revenuePlant =
    getYieldForPlant(item.crop, factor) * item.crop.salePrice;
  const revenueCropProf = revenuePlant * item.numCrops;
  const totalCosts = item.crop.costs * item.numCrops;
  // console.log(revenueCropProf, totalCosts);
  const profitCrop = revenueCropProf - totalCosts;
  // return parseFloat(profitCrop.toFixed(2));
  return profitCrop;
};

const getTotalProfit = function (item) {
  // console.log(Object.entries(item));
  console.log(item.crops);
  const resultProfitArray = item.crops.map((element, factor) => {
    // console.log(element);
    console.log("factors", element.crop.factors);
    // totalYield = element.crop.yield * element.numCrops;
    // totalRevenue = totalYield * element.crop.salePrice;
    // totalCosts = element.crop.costs * element.numCrops;
    // return totalRevenue - totalCosts;
    const revenuePlant =
      getYieldForPlant(element.crop, factor) * element.crop.salePrice;
    const revenueCrop = revenuePlant * element.numCrops;
    const totalCosts = element.crop.costs * element.numCrops;
    const profitCrop = revenueCrop - totalCosts;
    console.log("revPlant",revenuePlant, "revCrop", revenueCrop, "totCost",totalCosts, "profCrop", profitCrop);
    // return parseFloat(profitCrop.toFixed(2));
    return profitCrop;
  });
  const res = resultProfitArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  // console.log(res);
  return res;
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
