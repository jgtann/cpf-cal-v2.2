import React, { useState } from 'react';

type FormData = {
  age: number | "";
  oa: number | "";
  sa: number | "";
  ma: number | "";
};

type InputFormProps = {
  onCalculate: (form: FormData & { years: number }) => void;
};

export default function InputForm({ onCalculate }: InputFormProps) {
  const defaultForm: FormData = { age: "", oa: "", sa: "", ma: "" };
  const [form, setForm] = useState<FormData>(defaultForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = value === "" ? "" : parseFloat(value);
    setForm((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.age === "") return;

    const projectedYears = 55 - Number(form.age);
    const completeForm = {
      ...form,
      years: projectedYears >= 0 ? projectedYears : 0,
    };

    onCalculate(completeForm);
  };

  const handleClear = () => {
    setForm(defaultForm);
    onCalculate([] as any); // reset results
  };

  const yearsUntil55 =
    typeof form.age === "number" && form.age < 55 ? 55 - form.age : 0;

  const isAgeValid =
    typeof form.age === "number" && form.age >= 0 && form.age <= 100;

  const inputClass =
    "w-full p-2 rounded border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-teal-800 grid grid-cols-2 gap-10 mb-20 p-10 shadow rounded-lg"
    >
      <h2 className="bg-teal-900 col-span-2 text-2xl font-bold mb-2 text-white">
        Personal Info
      </h2>

      {/* Age */}
      <div>
        <label htmlFor="age" className="block text-2xl font-semibold mb-2 text-white">
          Age
        </label>
        <input
          id="age"
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="e.g. 44"
          min={0}
          max={100}
          className={inputClass}
        />
        {typeof form.age === "number" && form.age < 55 && (
          <p className="text-yellow-200 text-sm mt-1">
            Projecting {yearsUntil55} year{yearsUntil55 > 1 ? "s" : ""} until age 55
          </p>
        )}
        {typeof form.age === "number" && form.age >= 55 && (
          <p className="text-red-300 text-sm mt-1 italic">
            You're already 55 or older — CPF projection stops at age 55.
          </p>
        )}
      </div>

      {/* OA */}
      <div>
        <label htmlFor="oa" className="block text-2xl font-semibold mb-2 text-white">
          OA Balance
        </label>
        <input
          id="oa"
          type="number"
          name="oa"
          value={form.oa}
          onChange={handleChange}
          placeholder="e.g. 15000"
          className={inputClass}
        />
      </div>

      {/* SA */}
      <div>
        <label htmlFor="sa" className="block text-2xl font-semibold mb-2 text-white">
          SA Balance
        </label>
        <input
          id="sa"
          type="number"
          name="sa"
          value={form.sa}
          onChange={handleChange}
          placeholder="e.g. 25000"
          className={inputClass}
        />
      </div>

      {/* MA */}
      <div>
        <label htmlFor="ma" className="block text-2xl font-semibold mb-2 text-white">
          MA Balance
        </label>
        <input
          id="ma"
          type="number"
          name="ma"
          value={form.ma}
          onChange={handleChange}
          placeholder="e.g. 40000"
          className={inputClass}
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2 mt-4 flex gap-4">
        <button
          type="submit"
          disabled={!isAgeValid}
          className={`w-32 font-bold py-2 px-4 rounded ${
            !isAgeValid
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-white text-teal-800 hover:bg-teal-100"
          }`}
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-32 bg-gray-300 font-bold py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
