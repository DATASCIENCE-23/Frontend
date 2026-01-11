import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadInvoicePDF(invoice: any) {
  const doc = new jsPDF();

  /* ================= HEADER ================= */
  doc.setFontSize(18);
  doc.text("INVOICE", 14, 20);

  doc.setFontSize(11);
  doc.text("Hospital / Company Name", 14, 30);
  doc.text("Address line 1", 14, 36);
  doc.text("Phone: +91 XXXXXXXX", 14, 42);

  doc.text(`Invoice No: ${invoice.id}`, 150, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 36);
  doc.text(`Status: ${invoice.status}`, 150, 42);

  /* ================= TABLE ================= */
  autoTable(doc, {
    startY: 55,
    head: [["Service", "Qty", "Price", "Total"]],
    body: invoice.items.map((item: any) => [
      item.service_name,
      item.quantity,
      `₹${item.price}`,
      `₹${item.total}`,
    ]),
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  /* ================= TOTALS ================= */
  doc.text(`Subtotal: ₹${invoice.subtotal}`, 140, finalY);
  doc.text(`Tax (${invoice.tax_percent}%): ₹${invoice.tax}`, 140, finalY + 6);
  doc.setFontSize(13);
  doc.text(`Grand Total: ₹${invoice.grand_total}`, 140, finalY + 14);

  /* ================= FOOTER ================= */
  doc.setFontSize(10);
  doc.text("Thank you for your business!", 14, 280);

  doc.save(`invoice_${invoice.id}.pdf`);
}
