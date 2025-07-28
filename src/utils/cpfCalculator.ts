type FormData = {
  age: number,
  years: number,
  oa: number,
  sa: number,
  ma: number
};

type CPFYearProjection = {
  year: number;
  age: number;
  oa: number;
  sa: number;
  ma: number;
  total: number;
};

export function calculateCPFProjection(inputs: FormData): CPFYearProjection[] {
  const { age, years, oa, sa, ma } = inputs;

  const baseOAInterest = 0.025;
  const baseSMAInterest = 0.04;
  const extraInterest = 0.01;
  const maCap = 75500;  // ⛳️ MA cannot exceed this

  const results: CPFYearProjection[] = [];

  let currOA = oa;
  let currSA = sa;
  let currMA = ma;

  for (let i = 0; i <= years; i++) {
    const currentAge = age + i;
    const year = new Date().getFullYear() + i;

    // --- Extra Interest Allocation ---
    let extraEligible = 60000;
    const extraFromOA = Math.min(extraEligible, currOA, 20000);
    extraEligible -= extraFromOA;
    const extraFromSA = Math.min(extraEligible, currSA);
    extraEligible -= extraFromSA;
    const extraFromMA = Math.min(extraEligible, currMA);

    // --- Base + Extra Interest Calculations ---
    const oaInterest = currOA * baseOAInterest + extraFromOA * extraInterest;
    const saInterest = currSA * baseSMAInterest + extraFromSA * extraInterest;
    const maInterest = currMA * baseSMAInterest + extraFromMA * extraInterest;

    // --- Apply Interest ---
    currOA += oaInterest;
    currSA += saInterest;
    currMA += maInterest;

    // --- Enforce MA Cap and Move Excess to OA ---
    if (currMA > maCap) {
      const excess = currMA - maCap;
      currMA = maCap;
      currOA += excess; // move overflow to OA
    }

    const total = currOA + currSA + currMA;

    results.push({
      year,
      age: currentAge,
      oa: parseFloat(currOA.toFixed(2)),
      sa: parseFloat(currSA.toFixed(2)),
      ma: parseFloat(currMA.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    });

    // --- Age 55: Transfer SA to RA ---
    if (currentAge === 55) {
      currSA = 0;
    }
  }

  return results;
}
