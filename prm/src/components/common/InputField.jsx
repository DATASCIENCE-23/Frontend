export default function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label>{label}</label><br />
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
