export default function InsuranceSection({ insurances }) {
  return (
    <>
      <h3>Insurance</h3>
      {insurances.length === 0 && <p>No insurance found</p>}
      {insurances.map(ins => (
        <div key={ins.insurance_id}>
          {ins.provider_name} – {ins.policy_number}
        </div>
      ))}
    </>
  );
}
