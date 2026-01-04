export default function PatientList({ patients, onSelect }) {
  return (
    <>
      <h2>Patients</h2>
      <ul>
        {patients.map(p => (
          <li key={p.patient_id} onClick={() => onSelect(p.patient_id)}>
            {p.first_name} ({p.hospital_id})
          </li>
        ))}
      </ul>
    </>
  );
}
