import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/service.api";
import AnimatedCard from "./AnimatedCard";

export default function ServiceTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  if (isLoading) return <p>Loading services...</p>;
  if (error) return <p>Failed to load services</p>;

  return (
    <AnimatedCard>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Service</th>
            <th className="text-left p-2">Category</th>
            <th className="text-right p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((s: any) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.category}</td>
              <td className="p-2 text-right">₹{s.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AnimatedCard>
  );
}
