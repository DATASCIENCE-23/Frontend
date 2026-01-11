// src/components/forms/PrescriptionForm.jsx
import { createPrescription } from "../../api/prescription.api";

export default function PrescriptionForm() {
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await createPrescription(data);
    alert("Prescription created");
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Prescription</h2>

      <input name="medicine_id" placeholder="Medicine ID" />
      <input name="dosage" placeholder="Dosage" />
      <input name="frequency" placeholder="Frequency" />
      <input name="duration_days" type="number" placeholder="Days" />
      <textarea name="instructions" placeholder="Instructions" />

      <button>Create</button>
    </form>
  );
}
