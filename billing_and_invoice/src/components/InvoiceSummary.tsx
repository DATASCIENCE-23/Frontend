import AnimatedCard from "./AnimatedCard";

interface Props {
  invoice: {
    subtotal: number;
    tax: number;
    tax_percent: number;
    grand_total: number;
    status: string;
  };
}

export default function InvoiceSummary({ invoice }: Props) {
  return (
    <AnimatedCard>
      <h2 className="text-lg font-semibold mb-3">Invoice Summary</h2>

      <div className="space-y-1">
        <p>Subtotal: ₹{invoice.subtotal}</p>
        <p>Tax ({invoice.tax_percent}%): ₹{invoice.tax}</p>
        <p className="text-lg font-bold">
          Total: ₹{invoice.grand_total}
        </p>
        <p className="text-sm text-gray-600">
          Status: {invoice.status}
        </p>
      </div>
    </AnimatedCard>
  );
}
