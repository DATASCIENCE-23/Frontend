import { createBudget } from "../../api/budgetApi";

export default function BudgetForm() {
  return (
    <div className="card">
      <h3>Create Budget</h3>
      <input placeholder="Financial Year" />
      <input placeholder="Department ID" />
      <input placeholder="Total Amount" />
      <button onClick={createBudget}>Save</button>
    </div>
  );
}
