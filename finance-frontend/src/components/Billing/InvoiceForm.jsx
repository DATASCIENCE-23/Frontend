import { createInvoice } from "../../api/invoiceApi";

export default function InvoiceForm() {
  return (
    <div className="card">
      <h3>Create Invoice</h3>
      <input placeholder="Patient ID" />
      <input placeholder="Subtotal" />
      <button onClick={createInvoice}>Generate</button>
    </div>
  );
}
