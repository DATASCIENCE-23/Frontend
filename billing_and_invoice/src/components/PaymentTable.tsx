import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../api/payment.api";
import AnimatedCard from "./AnimatedCard";

export default function PaymentTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  if (isLoading) return <p>Loading payments...</p>;
  if (error) return <p>Failed to load payments</p>;

  return (
    <AnimatedCard>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Invoice</th>
            <th className="text-right p-2">Amount</th>
            <th className="text-left p-2">Mode</th>
            <th className="text-left p-2">Reference</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((p: any) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.invoice_id}</td>
              <td className="p-2 text-right">₹{p.amount}</td>
              <td className="p-2">{p.mode}</td>
              <td className="p-2">{p.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AnimatedCard>
  );
}
