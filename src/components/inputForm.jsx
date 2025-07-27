import React from 'react';
import { useState } from 'react';

export default function InputForm({ onCalculate }) {
  const defaultForm = { age: "", years: "", oa: "", sa: "", ma: "" };
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(form);
  };

  const handleClear = () => {
    setForm(defaultForm);
    onCalculate([]); // Optionally reset results display too
  };

  return (
    <form onSubmit={handleSubmit} className="bg-teal-800 grid grid-cols-2 gap-10 mb-20 p-10 shadow rounded-lg">
      <h2 className="bg-teal-900 col-span-2 text-2xl font-bold mb-2">Personal Info</h2>

      <div>
        <label className="block text-2xl font-semibold mb-2">Age</label>
        <input type="number" name="age" value={form.age} onChange={handleChange} className="w-full border text-lg px-4 py-4 rounded text-left" />
      </div>
      <div>
        <label className="block text-2xl font-semibold mb-1">Years to Project</label>
        <input type="number" name="years" value={form.years} onChange={handleChange} className="w-full border text-lg px-4 py-4 rounded text-left" />
      </div>

      <h2 className="bg-teal-900 col-span-2 text-xl font-bold mt-4 mb-2">CPF Balances</h2>

      <div>
        <label className="block text-xl font-bold mb-1">OA</label>
        <input type="number" name="oa" value={form.oa} onChange={handleChange} className="w-full border text-lg px-4 py-4 rounded text-left" />
      </div>
      <div>
        <label className="block text-xl font-semibold mb-1">SA</label>
        <input type="number" name="sa" value={form.sa} onChange={handleChange} className="w-full border text-lg px-4 py-4 rounded text-left" />
      </div>
      <div>
        <label className="block text-xl font-semibold mb-1">MA</label>
        <input type="number" name="ma" value={form.ma} onChange={handleChange} className="w-full border text-lg px-4 py-4 rounded text-left" />
      </div>

      <div className="col-span-2 flex justify-center gap-4 mt-6">
        <button type="submit" className="w-45 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Calculate
        </button>
        <button type="button" onClick={handleClear} className="w-45 bg-blue-600 text-white px-6 py-2 rounded hover:bg-gray-500 transition">
          Clear
        </button>
      </div>
    </form>
  );
}
