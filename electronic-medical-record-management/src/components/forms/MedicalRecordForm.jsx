// src/components/forms/MedicalRecordForm.jsx
import { createMedicalRecord } from "../../api/medicalRecord.api";
import { colors } from "../../theme/colors";

export default function MedicalRecordForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    await createMedicalRecord(Object.fromEntries(form));
    alert("Medical record saved");
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: colors.lightest }}>
      <h2>Medical Record Entry</h2>

      <textarea name="chief_complaint" placeholder="Chief Complaint" />
      <textarea name="history_of_present_illness" placeholder="HPI" />
      <textarea name="physical_examination" placeholder="Physical Exam" />
      <textarea name="diagnosis" placeholder="Diagnosis" />
      <textarea name="treatment_plan" placeholder="Treatment Plan" />
      <textarea name="notes" placeholder="Notes" />

      <button style={{ background: colors.primaryDark }}>Save</button>
    </form>
  );
}
