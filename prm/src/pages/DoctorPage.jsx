import { useEffect, useState } from "react";
import DoctorForm from "../components/doctor/DoctorForm";
import DoctorList from "../components/doctor/DoctorList";
import SpecializationForm from "../components/doctor/SpecializationForm";
import { createDoctor, getDoctors } from "../api/doctorApi";

export default function DoctorPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors().then(res => setDoctors(res.data));
  }, []);

  const handleAddDoctor = async (data) => {
    await createDoctor(data);
    alert("Doctor added");
  };

  return (
    <>
      <SpecializationForm />
      <DoctorForm onSubmit={handleAddDoctor} />
      <DoctorList doctors={doctors} />
    </>
  );
}
