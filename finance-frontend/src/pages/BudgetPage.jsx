import BudgetForm from "../components/Budget/BudgetForm";
import BudgetList from "../components/Budget/BudgetList";

export default function BudgetPage() {
  return (
    <div>
      <h2>Budget Management</h2>
      <BudgetForm />
      <BudgetList />
    </div>
  );
}
