import AdmissionForm from "../components/admission/AdmissionForm";
import { createAdmission } from "../api/admissionApi";

export default function AdmissionPage() {

  const handleAdmission = async (data) => {
    try {
      await createAdmission(data);
      alert("Admission created");
    } catch (err) {
      alert("Admission failed");
    }
  };

  return (
    <>
      <AdmissionForm onSubmit={handleAdmission} />
    </>
  );
}
