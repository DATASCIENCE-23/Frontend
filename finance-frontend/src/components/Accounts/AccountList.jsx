import { useEffect, useState } from "react";
import { getAccounts } from "../../api/accountApi";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts().then(res => setAccounts(res.data));
  }, []);

  return (
    <table>
      <tr><th>Code</th><th>Name</th><th>Type</th></tr>
      {accounts.map(a => (
        <tr key={a.account_id}>
          <td>{a.account_code}</td>
          <td>{a.account_name}</td>
          <td>{a.account_type}</td>
        </tr>
      ))}
    </table>
  );
}
