import { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

export default function DoctorForm({ onSubmit }) {
  const [doctor, setDoctor] = useState({
    first_name: "",
    specialization: "",
    license_number: ""
  });

  return (
    <>
      <h2>Add Doctor</h2>

      <InputField label="First Name"
        value={doctor.first_name}
        onChange={e => setDoctor({ ...doctor, first_name: e.target.value })}
      />

      <InputField label="Specialization"
        value={doctor.specialization}
        onChange={e => setDoctor({ ...doctor, specialization: e.target.value })}
      />

      <InputField label="License Number"
        value={doctor.license_number}
        onChange={e => setDoctor({ ...doctor, license_number: e.target.value })}
      />

      <Button text="Save Doctor" onClick={() => onSubmit(doctor)} />
    </>
  );
}
