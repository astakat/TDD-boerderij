const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
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

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environmental factor sun low, and medium wind", () => {
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(13.5);
  });

  test("Get yield for plant with environmental factor sun high and soil clay", () => {
    const environmentFactors = {
      sun: "high",
      soil: "clay",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(49.5);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  test("Get costs for crop, simple", () => {
    const corn = {
      name: "corn",
      costs: 1,
    };
    const input = {
      crop: corn,
      numCrops: 230,
    };
    expect(getCostsForCrop(input)).toBe(230);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 20,
      salePrice: 2,
    };
    expect(getRevenueForCrop(input)).toBe(120);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
    };
    const input = {
      crop: corn,
      numCrops: 20,
      salePrice: 2,
    };
    expect(getProfitForCrop(input)).toBe(100);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit with multiple crops, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
    };
    const crops = [
      { crop: corn, numCrops: 20, salePrice: 2 },
      { crop: pumpkin, numCrops: 10, salePrice: 4 },
    ];
    expect(getTotalProfit({ crops })).toBe(240);
  });
});
