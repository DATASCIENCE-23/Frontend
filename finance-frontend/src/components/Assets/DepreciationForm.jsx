import { useState } from "react";
import { createDepreciation } from "../../api/depreciationApi";

export default function DepreciationForm() {
  const [form, setForm] = useState({});

  return (
    <div className="card">
      <h3>Add Depreciation</h3>
      <input placeholder="Asset ID" onChange={e=>setForm({...form, asset_id:e.target.value})}/>
      <input placeholder="Amount" onChange={e=>setForm({...form, depreciation_amount:e.target.value})}/>
      <button onClick={()=>createDepreciation(form)}>Save</button>
    </div>
  );
}
