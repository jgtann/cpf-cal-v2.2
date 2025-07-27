export function calculateCPFProjection({ age, years, oa, sa, ma }) {
  const baseOA = 0.025;
  const baseSA_MA = 0.04;
  const extraRate = 0.01;
  const MA_CAP = 75500;
  const projection = [];
  const formatter = new Intl.NumberFormat('en-SG', {
  style: 'currency',
  currency: 'SGD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


  for (let i = 0; i < years; i++) {
    const year = age + i;

    const totalBeforeInterest = oa + sa + ma;
    let oaExtra = 0;
    let saExtra = 0;

    if (totalBeforeInterest <= 60000) {
      const oaCap = Math.min(20000, oa);
      const saMaCap = Math.min(40000, sa + ma);
      oaExtra = oaCap * extraRate;
      saExtra = saMaCap * extraRate;
    }

    // Apply base interest and extra interest
    let newOA = oa * (1 + baseOA) + oaExtra;
    let newSA = sa * (1 + baseSA_MA) + (sa + ma > 0 ? saExtra * (sa / (sa + ma)) : 0);
    let newMA = ma * (1 + baseSA_MA) + (sa + ma > 0 ? saExtra * (ma / (sa + ma)) : 0);

    // Apply MA cap logic: overflow goes to OA
    if (newMA > MA_CAP) {
      const overflow = newMA - MA_CAP;
      newMA = MA_CAP;
      newOA += overflow; // redirect excess to OA
    }

    // Store this year’s projection
    projection.push({
    year,
    oa: newOA,
    sa: newSA,
    ma: newMA,
    total: newOA + newSA + newMA,
    });

    // Set balances for next year
    oa = newOA;
    sa = newSA;
    ma = newMA;
  }

  return projection;
}
