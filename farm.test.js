const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

const corn = {
  name: "corn",
  yield: 3,
  costs: 1,
  salePrice: 2,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
      low: -5,
      medium: -10,
      high: -15,
    },
    soil: {
      sand: 0,
      clay: 10,
      silt: 25,
    },
  },
};

const pumpkin = {
  name: "pumpkin",
  yield: 4,
  costs: 2,
  salePrice: 4,
  factors: {
    sun: {
      low: -20,
      medium: 10,
      high: 40,
    },
    wind: {
      low: 10,
      medium: 0,
      high: -5,
    },
    soil: {
      sand: 30,
      clay: -10,
      silt: -20,
    },
  },
};

const cale = {
  name: "cale",
  yield: 5,
  costs: 3,
  salePrice: 4,
  factors: {
    sun: {
      low: 0,
      medium: 5,
      high: 10,
    },
    wind: {
      low: 0,
      medium: 0,
      high: -5,
    },
    soil: {
      sand: 40,
      clay: 0,
      silt: -25,
    },
  },
};

const avocado = {
  name: "avocado",
  yield: 2,
  costs: 4,
  salePrice: 6,
  factors: {
    sun: {
      low: -25,
      medium: -10,
      high: 30,
    },
    wind: {
      low: 10,
      medium: 0,
      high: -5,
    },
  },
};

describe("getYieldForPlant", () => {
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(3);
  });

  test("Get yield for plant with environmental factor sun low, and medium wind", () => {
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(1.35);
  });

  test("Get yield for plant with environmental factor sun high and soil clay", () => {
    const environmentFactors = {
      sun: "high",
      soil: "clay",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(4.95);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
  test("Get yield for crop incl environment fac ", () => {
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      soil: "silt",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(168.9);
  });
  test("Get yield for crop cale incl environment fac ", () => {
    const input = {
      crop: cale,
      numCrops: 20,
    };
    const environmentFactors = {
      sun: "medium",
      soil: "silt",
      wind: "high",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(374);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield with multiple crops with environment fac", () => {
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: cale, numCrops: 13 },
    ];
    const environmentFactors = {
      sun: "high",
      soil: "silt",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(352.9);
  });
});

describe("getCostsForCrop", () => {
  test("Get costs for crop, simple", () => {
    const input = {
      crop: corn,
      numCrops: 230,
    };
    expect(getCostsForCrop(input)).toBe(230);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop, simple", () => {
    const input = {
      crop: corn,
      numCrops: 20,
    };
    expect(getRevenueForCrop(input)).toBe(120);
  });
  test("Get revenue for crop cale with environmentfactors", () => {
    const input = {
      crop: cale,
      numCrops: 12,
    };
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(250.56);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop, simple with corn", () => {
    const input = {
      crop: corn,
      numCrops: 20,
    };
    expect(getProfitForCrop(input)).toBe(100);
  });

  test("Get profit for crop with environmental factors, on crop avocado", () => {
    const input = {
      crop: avocado,
      numCrops: 5,
    };
    const environmentFactors = {
      sun: "high",
      wind: "low",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(64);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit with multiple crops, simple", () => {
    const crops = [
      { crop: corn, numCrops: 20 },
      { crop: pumpkin, numCrops: 10 },
    ];
    expect(getTotalProfit({ crops })).toBe(240);
  });
  test("Calculate total profit with multiple crops, with environmental factors", () => {
    const crops = [
      { crop: corn, numCrops: 20 },
      { crop: pumpkin, numCrops: 10 },
      { crop: avocado, numCrops: 5 },
    ];
    const environmentFactors = {
      sun: "medium",
      wind: "low",
      soil: "clay",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(302);
  });
});
