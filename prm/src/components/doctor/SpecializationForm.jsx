import InputField from "../common/InputField";
import Button from "../common/Button";
import { useState } from "react";

export default function SpecializationForm() {
  const [spec, setSpec] = useState("");

  return (
    <>
      <h2>Add Specialization</h2>
      <InputField label="Specialization"
        value={spec}
        onChange={e => setSpec(e.target.value)}
      />
      <Button text="Save" onClick={() => alert("Saved")} />
    </>
  );
}
