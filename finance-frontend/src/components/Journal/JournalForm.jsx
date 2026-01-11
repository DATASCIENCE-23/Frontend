import { useState } from "react";
import { createJournal } from "../../api/journalApi";

export default function JournalForm() {
  const [form, setForm] = useState({});

  return (
    <div className="card">
      <h3>Add Journal Entry</h3>

      <input placeholder="Reference Type"
        onChange={e => setForm({...form, reference_type: e.target.value})} />

      <input placeholder="Reference ID"
        onChange={e => setForm({...form, reference_id: e.target.value})} />

      <input placeholder="Description"
        onChange={e => setForm({...form, description: e.target.value})} />

      <button onClick={() => createJournal(form)}>Save</button>
    </div>
  );
}
