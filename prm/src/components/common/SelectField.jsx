export default function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label>{label}</label><br />
      <select value={value} onChange={onChange}>
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
