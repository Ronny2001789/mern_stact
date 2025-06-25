const QuantityField = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block font-medium mb-1">Quantity</label>
    <input
      type="number"
      min="1"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full border rounded px-3 py-2"
    />
  </div>
);

export default QuantityField;
