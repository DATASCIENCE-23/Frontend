import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInvoiceById } from "../api/invoice.api";
import InvoiceSummary from "../components/InvoiceSummary";
import InvoiceActions from "../components/InvoiceActions";

export default function InvoiceDetail() {
  const { id } = useParams();

  if (!id) return <p>Invalid invoice</p>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
  });

  if (isLoading) return <p>Loading...</p>;

  const invoice = data.data;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Invoice #{invoice.id}
      </h1>

      <InvoiceSummary invoice={invoice} />
      <InvoiceActions invoiceId={invoice} />
    </>
  );
}
