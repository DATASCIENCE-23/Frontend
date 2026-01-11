import { useEffect, useState } from "react";
import { getBudgets } from "../../api/budgetApi";

export default function BudgetList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBudgets().then(res => setData(res.data));
  }, []);

  return (
    <table>
      <tr>
        <th>ID</th><th>Year</th><th>Amount</th>
      </tr>
      {data.map(b => (
        <tr key={b.budget_id}>
          <td>{b.budget_id}</td>
          <td>{b.financial_year}</td>
          <td>{b.total_amount}</td>
        </tr>
      ))}
    </table>
  );
}
