import InputField from "../common/InputField";
import Button from "../common/Button";
import { useState } from "react";

export default function AdmissionForm({ onSubmit }) {
  const [admission, setAdmission] = useState({
    ward: "",
    bed_number: "",
    admission_reason: ""
  });

  return (
    <>
      <h2>Admission</h2>

      <InputField label="Ward"
        value={admission.ward}
        onChange={e => setAdmission({ ...admission, ward: e.target.value })}
      />

      <InputField label="Bed Number"
        value={admission.bed_number}
        onChange={e => setAdmission({ ...admission, bed_number: e.target.value })}
      />

      <InputField label="Reason"
        value={admission.admission_reason}
        onChange={e => setAdmission({ ...admission, admission_reason: e.target.value })}
      />

      <Button text="Admit Patient" onClick={() => onSubmit(admission)} />
    </>
  );
}
