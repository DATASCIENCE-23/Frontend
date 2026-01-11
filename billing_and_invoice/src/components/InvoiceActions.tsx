import { Link } from "react-router-dom";
import AnimatedCard from "./AnimatedCard";
import { downloadInvoicePDF } from "../utils/invoicePdf";

interface Props {
  invoiceId: string;
  status?: string;
}

export default function InvoiceActions({ invoiceId, status }: Props) {
  return (
    <AnimatedCard>
      <div className="flex gap-4">
        <button
          onClick={() => downloadInvoicePDF(invoiceId)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          >
          Download Invoice PDF
        </button>

        {status !== "PAID" && (
          <Link
            to={`/payments/collect/${invoiceId}`}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Collect Payment
          </Link>
        )}
      </div>
    </AnimatedCard>
  );
}
