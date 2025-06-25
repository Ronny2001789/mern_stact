const SelectField = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block font-medium mb-1">Select Product</label>
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full border rounded px-3 py-2">
      <option value="">-- Choose --</option>
      <option value="item1">Item 1</option>
      <option value="item2">Item 2</option>
      <option value="item3">Item 3</option>
    </select>
  </div>
);

export default SelectField;
