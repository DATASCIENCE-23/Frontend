import { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

export default function PatientForm({ onSubmit }) {
  const [patient, setPatient] = useState({
    hospital_id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    patient_type: ""
  });

  return (
    <>
      <h2>Add Patient</h2>

      <InputField label="Hospital ID"
        value={patient.hospital_id}
        onChange={e => setPatient({ ...patient, hospital_id: e.target.value })}
      />

      <InputField label="First Name"
        value={patient.first_name}
        onChange={e => setPatient({ ...patient, first_name: e.target.value })}
      />

      <InputField label="Last Name"
        value={patient.last_name}
        onChange={e => setPatient({ ...patient, last_name: e.target.value })}
      />

      <InputField label="Phone"
        value={patient.phone_number}
        onChange={e => setPatient({ ...patient, phone_number: e.target.value })}
      />

      <Button text="Save Patient" onClick={() => onSubmit(patient)} />
    </>
  );
}
