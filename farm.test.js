const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
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
