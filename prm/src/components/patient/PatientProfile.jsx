export default function PatientProfile({ patient }) {
  return (
    <>
      <h2>Patient Profile</h2>
      <p><b>Name:</b> {patient.first_name} {patient.last_name}</p>
      <p><b>Phone:</b> {patient.phone_number}</p>
      <p><b>Email:</b> {patient.email}</p>
      <p><b>Type:</b> {patient.patient_type}</p>
    </>
  );
}
