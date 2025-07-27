import { useState } from 'react';
import InputForm from './components/inputForm';
import ResultTable from './components/resultTable';
import { calculateCPFProjection } from './utils/cpfCalculator';

export default function App() {
  const [results, setResults] = useState([]);

  const handleCalculate = (inputs) => {
    const output = calculateCPFProjection(inputs);
    setResults(output);
  };

  return (
    <div className="min-h-screen bg-teal-700 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">CPF Interest Calculator</h1>
        <InputForm onCalculate={handleCalculate} />
        {results.length > 0 && (
          <>
            <ResultTable data={results} />
        
          </>
        )}
      </div>
    </div>
  );
}