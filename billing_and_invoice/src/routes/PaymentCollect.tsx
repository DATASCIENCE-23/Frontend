import { useParams } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";

export default function PaymentCollect() {
  const { invoiceId } = useParams();

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Collect Payment</h1>
      <PaymentForm invoiceId={invoiceId} amount={500} />
    </>
  );
}
