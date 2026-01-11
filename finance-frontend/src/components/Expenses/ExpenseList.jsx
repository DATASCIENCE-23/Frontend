import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../../api/expenseApi";

export default function ExpenseList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getExpenses().then(res => setData(res.data));
  }, []);

  return (
    <table>
      <tr>
        <th>ID</th><th>Amount</th><th>Dept</th><th>Action</th>
      </tr>
      {data.map(e => (
        <tr key={e.expense_id}>
          <td>{e.expense_id}</td>
          <td>{e.amount}</td>
          <td>{e.department_id}</td>
          <td>
            <button onClick={() => deleteExpense(e.expense_id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}
