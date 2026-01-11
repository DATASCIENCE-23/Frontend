import { useState } from "react";
import { createAsset } from "../../api/assetApi";

export default function AssetForm({ refresh }) {
  const [form, setForm] = useState({});

  return (
    <div className="card">
      <h3>Add Asset</h3>
      <input placeholder="Code" onChange={e=>setForm({...form, asset_code:e.target.value})}/>
      <input placeholder="Name" onChange={e=>setForm({...form, asset_name:e.target.value})}/>
      <input placeholder="Cost" onChange={e=>setForm({...form, purchase_cost:e.target.value})}/>
      <button onClick={()=>createAsset(form).then(refresh)}>Save</button>
    </div>
  );
}
