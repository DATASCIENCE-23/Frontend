import { useState } from "react";
import { createExpense } from "../../api/expenseApi";

export default function ExpenseForm() {
  const [form, setForm] = useState({});

  return (
    <div className="card">
      <h3>Add Expense</h3>
      <input placeholder="Amount" onChange={e=>setForm({...form, amount:e.target.value})}/>
      <input placeholder="Department ID" onChange={e=>setForm({...form, department_id:e.target.value})}/>
      <button onClick={()=>createExpense(form)}>Save</button>
    </div>
  );
}
