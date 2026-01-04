export default function DoctorList({ doctors }) {
  return (
    <>
      <h2>Doctors</h2>
      <ul>
        {doctors.map(d => (
          <li key={d.doctor_id}>
            {d.first_name} – {d.specialization}
          </li>
        ))}
      </ul>
    </>
  );
}
