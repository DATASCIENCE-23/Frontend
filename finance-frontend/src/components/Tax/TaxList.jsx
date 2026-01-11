import { useEffect, useState } from "react";
import { getTaxes, deleteTax } from "../../api/taxApi";

export default function TaxList() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await getTaxes();
    setData(res.data);
  };

  useEffect(()=>{ load(); }, []);

  return (
    <table>
      <tr><th>ID</th><th>Name</th><th>Rate</th><th>Action</th></tr>
      {data.map(t=>(
        <tr key={t.tax_id}>
          <td>{t.tax_id}</td>
          <td>{t.tax_name}</td>
          <td>{t.tax_rate}</td>
          <td><button onClick={()=>deleteTax(t.tax_id)}>Delete</button></td>
        </tr>
      ))}
    </table>
  );
}
