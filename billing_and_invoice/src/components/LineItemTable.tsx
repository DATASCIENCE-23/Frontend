import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/service.api";
import AnimatedCard from "./AnimatedCard";

export interface LineItem {
  service_id: number;
  service_name: string;
  price: number;
  quantity: number;
}

interface Props {
  items: LineItem[];
  setItems: React.Dispatch<React.SetStateAction<LineItem[]>>;
}

export default function LineItemTable({ items, setItems }: Props) {
  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const services = data?.data || [];

  const addService = (service: any) => {
    const exists = items.find(i => i.service_id === service.id);
    if (exists) return;

    setItems(prev => [
      ...prev,
      {
        service_id: service.id,
        service_name: service.name,
        price: service.price,
        quantity: 1,
      },
    ]);
  };

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return;
    setItems(prev =>
      prev.map(i =>
        i.service_id === id ? { ...i, quantity: qty } : i
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.service_id !== id));
  };

  return (
    <AnimatedCard>
      <h2 className="text-lg font-semibold mb-3">Invoice Items</h2>

      {/* Service Picker */}
      <select
        className="border p-2 mb-4 w-full"
        onChange={(e) => {
          const service = services.find(
            (s: any) => s.id === Number(e.target.value)
          );
          if (service) addService(service);
        }}
      >
        <option value="">+ Add Service</option>
        {services.map((s: any) => (
          <option key={s.id} value={s.id}>
            {s.name} – ₹{s.price}
          </option>
        ))}
      </select>

      {/* Line Item Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left">Service</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <motion.tr
              key={item.service_id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-b"
            >
              <td>{item.service_name}</td>

              <td className="text-center">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  className="w-16 border p-1 text-center"
                  onChange={(e) =>
                    updateQty(item.service_id, Number(e.target.value))
                  }
                />
              </td>

              <td className="text-center">₹{item.price}</td>

              <td className="text-center font-semibold">
                ₹{item.price * item.quantity}
              </td>

              <td className="text-right">
                <button
                  className="text-red-500"
                  onClick={() => removeItem(item.service_id)}
                >
                  ✕
                </button>
              </td>
            </motion.tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No services added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </AnimatedCard>
  );
}
