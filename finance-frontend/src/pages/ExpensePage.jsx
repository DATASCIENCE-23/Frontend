import ExpenseForm from "../components/Expenses/ExpenseForm";
import ExpenseList from "../components/Expenses/ExpenseList";

export default function ExpensePage() {
  return (
    <div>
      <h2>Expenses</h2>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}
