import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../api/invoice.api";
import AnimatedCard from "../components/AnimatedCard";
import { Link } from "react-router-dom";

export default function InvoiceList() {
  const { data } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link
          to="/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Invoice
        </Link>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((inv: any) => (
          <AnimatedCard key={inv.id}>
            <p className="font-semibold">Invoice #{inv.id}</p>
            <p>Total: ₹{inv.grand_total}</p>
            <Link
              to={`/invoices/${inv.id}`}
              className="text-blue-600 mt-2 inline-block"
            >
              View
            </Link>
          </AnimatedCard>
        ))}
      </div>

    </>
  );
}
