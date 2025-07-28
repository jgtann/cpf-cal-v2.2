import { useState } from 'react';
import InputForm from './components/inputForm';
import { calculateCPFProjection } from './utils/cpfCalculator';
import ResultTable from './components/resultTable';
import InterestChart from './components/interestChart';

type CPFYearProjection = {
  age: number;
  year: number;
  oa: number;
  sa: number;
  ma: number;
  total: number;
};

export default function App() {
  const [results, setResults] = useState<CPFYearProjection[]>([]);

  const handleCalculate = (inputs: any) => {
    const output = calculateCPFProjection(inputs);
    setResults(output);
  };

  return (
    <div className="min-h-screen bg-teal-700 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">CPF Interest Calculator</h1>
        <InputForm onCalculate={handleCalculate} />
        {results.length > 0 && (
          <>
            <ResultTable data={results} />
            <InterestChart data={results} />
          </>
        )}
      </div>
    </div>
  );
}
