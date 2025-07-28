import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type CPFYearProjection = {
  year: number;
  oa: number;
  sa: number;
  ma: number;
  total: number;
};

type InterestChartProps = {
  data: CPFYearProjection[];
};

export default function InterestChart({ data }: InterestChartProps) {
  if (data.length === 0) return null;

  return (
    <div className="mt-16 mb-25">
      <h2 className="text-2xl font-bold mb-4 text-center text-teal-800">Growth Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 80, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year"  tick={{ fill: '#fef08a' }}/>
          <YAxis tick={{ fill: '#fef08a' }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
          <Tooltip formatter={(value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
          <Legend />
          <Line type="monotone" dataKey="oa" name="OA" stroke="#0d9488" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="sa" name="SA" stroke="#1d4ed8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="ma" name="MA" stroke="#be185d" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="total" name="Total" stroke="#10b981" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
