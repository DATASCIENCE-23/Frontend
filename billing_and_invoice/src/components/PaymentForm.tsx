import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../api/payment.api";
import AnimatedCard from "./AnimatedCard";
import toast from "react-hot-toast";

interface Props {
  invoiceId: string | undefined;
  amount: number;
}

export default function PaymentForm({ invoiceId, amount }: Props) {
  const [mode, setMode] = useState("UPI");
  const [reference, setReference] = useState("");

  const mutation = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      toast.success("Payment recorded successfully");
      setReference("");
    },
    onError: () => {
      toast.error("Payment failed");
    },
  });

  const submitPayment = () => {
    if (!invoiceId) {
      toast.error("Invalid invoice");
      return;
    }

    mutation.mutate({
      invoice_id: invoiceId,
      amount,
      mode,
      reference,
    });
  };

  return (
    <AnimatedCard>
      <h2 className="text-lg font-semibold mb-3">Payment</h2>

      <div className="space-y-3">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>

        <input
          placeholder="Reference Number"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          value={`₹${amount}`}
          disabled
          className="border p-2 w-full bg-gray-100"
        />

        <button
          onClick={submitPayment}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Submit Payment
        </button>
      </div>
    </AnimatedCard>
  );
}
