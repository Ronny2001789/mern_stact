const InputField = ({ label, type = "text", value, onChange }) => (
  <div className="mb-4">
    <label className="block font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border rounded px-3 py-2"
    />
  </div>
);

export default InputField;
