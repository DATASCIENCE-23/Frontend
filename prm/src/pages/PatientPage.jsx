import { useEffect, useState } from "react";
import PatientForm from "../components/patient/PatientForm";
import PatientList from "../components/patient/PatientList";
import PatientProfile from "../components/patient/PatientProfile";
import AddressSection from "../components/patient/AddressSection";
import InsuranceSection from "../components/patient/InsuranceSection";
import { createPatient, getPatients, getPatientDetails } from "../api/patientApi";

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    getPatients().then(res => setPatients(res.data));
  }, []);

  const handleAddPatient = async (data) => {
    await createPatient(data);
    alert("Patient added");
  };

  const loadPatientDetails = async (id) => {
    const res = await getPatientDetails(id);
    setSelectedPatient(res.data);
  };

  return (
    <>
      <PatientForm onSubmit={handleAddPatient} />
      <PatientList patients={patients} onSelect={loadPatientDetails} />

      {selectedPatient && (
        <>
          <PatientProfile patient={selectedPatient.patient} />
          <AddressSection addresses={selectedPatient.addresses} />
          <InsuranceSection insurances={selectedPatient.insurances} />
        </>
      )}
    </>
  );
}
