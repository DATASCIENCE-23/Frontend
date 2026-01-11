import { useEffect, useState } from "react";
import { getDepreciation, deleteDepreciation } from "../../api/depreciationApi";

export default function DepreciationList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDepreciation().then(res => setData(res.data));
  }, []);

  return (
    <table>
      <tr>
        <th>ID</th><th>Asset</th><th>Amount</th><th>Action</th>
      </tr>
      {data.map(d => (
        <tr key={d.depreciation_id}>
          <td>{d.depreciation_id}</td>
          <td>{d.asset_id}</td>
          <td>{d.depreciation_amount}</td>
          <td>
            <button onClick={() => deleteDepreciation(d.depreciation_id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}
