import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createInvoice } from "../api/invoice.api";
import LineItemTable from "./LineItemTable";
import type { LineItem } from "./LineItemTable";
import AnimatedCard from "./AnimatedCard";
import toast from "react-hot-toast";

export default function InvoiceForm() {
  const [items, setItems] = useState<LineItem[]>([]);

  const mutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      toast.success("Invoice created successfully");
      setItems([]);
    },
    onError: () => {
      toast.error("Failed to create invoice");
    },
  });

  const submitInvoice = () => {
    if (items.length === 0) {
      toast.error("Add at least one service");
      return;
    }

    mutation.mutate({
      patient_id: 1,
      items: items.map(i => ({
        service_id: i.service_id,
        quantity: i.quantity,
      })),
    });
  };

  return (
    <>
      <LineItemTable items={items} setItems={setItems} />

      <AnimatedCard>
        <button
          onClick={submitInvoice}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Create Invoice
        </button>
      </AnimatedCard>
    </>
  );
}
