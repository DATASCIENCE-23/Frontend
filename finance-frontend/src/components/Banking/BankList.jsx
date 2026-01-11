import { useEffect, useState } from "react";
import { getBanks } from "../../api/bankApi";

export default function BankList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBanks().then(res => setData(res.data));
  }, []);

  return (
    <table>
      <tr>
        <th>ID</th><th>Bank</th><th>Account</th><th>Balance</th>
      </tr>
      {data.map(b => (
        <tr key={b.bank_account_id}>
          <td>{b.bank_account_id}</td>
          <td>{b.bank_name}</td>
          <td>{b.account_number}</td>
          <td>{b.balance}</td>
        </tr>
      ))}
    </table>
  );
}
