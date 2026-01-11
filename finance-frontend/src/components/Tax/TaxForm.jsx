import { useState } from "react";
import { createTax } from "../../api/taxApi";

export default function TaxForm({ refresh }) {
  const [form, setForm] = useState({
    tax_code: "",
    tax_name: "",
    tax_rate: "",
    account_id: ""
  });

  const submit = async () => {
    await createTax(form);
    refresh();
  };

  return (
    <div className="card">
      <h3>Add Tax</h3>
      <input placeholder="Code" onChange={e=>setForm({...form, tax_code:e.target.value})}/>
      <input placeholder="Name" onChange={e=>setForm({...form, tax_name:e.target.value})}/>
      <input placeholder="Rate" onChange={e=>setForm({...form, tax_rate:e.target.value})}/>
      <input placeholder="Account ID" onChange={e=>setForm({...form, account_id:e.target.value})}/>
      <button onClick={submit}>Save</button>
    </div>
  );
}
