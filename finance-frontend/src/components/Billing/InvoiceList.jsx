import { useEffect, useState } from "react";
import { getInvoices } from "../../api/invoiceApi";

export default function InvoiceList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInvoices().then(res => setData(res.data));
  }, []);

  return (
    <table>
      <tr>
        <th>ID</th><th>Patient</th><th>Total</th>
      </tr>
      {data.map(i => (
        <tr key={i.invoice_id}>
          <td>{i.invoice_id}</td>
          <td>{i.patient_id}</td>
          <td>{i.total_amount}</td>
        </tr>
      ))}
    </table>
  );
}
