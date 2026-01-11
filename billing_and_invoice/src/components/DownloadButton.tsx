import { downloadInvoicePDF } from "../api/invoice.api";

export default function DownloadButton({ invoiceId }: any) {
  const download = async () => {
    const res = await downloadInvoicePDF(invoiceId);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${invoiceId}.pdf`;
    a.click();
  };

  return (
    <button className="btn-primary" onClick={download}>
      Download Invoice
    </button>
  );
}
