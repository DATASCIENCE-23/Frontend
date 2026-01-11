import { useState } from "react";
import { createAccount } from "../../api/accountApi";

export default function AccountForm() {
  const [form, setForm] = useState({});

  return (
    <div className="card">
      <h3>Add Account</h3>

      <input placeholder="Account Code"
        onChange={e => setForm({...form, account_code: e.target.value})} />

      <input placeholder="Account Name"
        onChange={e => setForm({...form, account_name: e.target.value})} />

      <input placeholder="Account Type"
        onChange={e => setForm({...form, account_type: e.target.value})} />

      <button onClick={() => createAccount(form)}>Save</button>
    </div>
  );
}
