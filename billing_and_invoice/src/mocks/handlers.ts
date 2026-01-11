import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:8000/api/payments", () => {
    return HttpResponse.json([
      {
        id: 1,
        invoice_id: 1,
        amount: 1890,
        mode: "UPI",
        reference: "UPI12345",
      },
    ]);
  }),

  http.get("http://localhost:8000/services", () => {
    return HttpResponse.json([
      { id: 1, name: "Blood Test", category: "Lab", price: 500 },
      { id: 2, name: "X-Ray", category: "Radiology", price: 800 },
    ]);
  }),

  http.get("http://localhost:8000/invoice/:id", ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id,
      subtotal: 1800,
      tax: 90,
      tax_percent: 5,
      grand_total: 1890,
      status: "Pending",
      items: [
        {
          service_name: "Blood Test",
          quantity: 2,
          price: 500,
          total: 1000,
        },
        {
          service_name: "X-Ray",
          quantity: 1,
          price: 800,
          total: 800,
        },
      ],
    });
  }),

  http.get("http://localhost:8000/invoice", () => {
    return HttpResponse.json([
      { id: 1, grand_total: 1890, status: "Pending" },
    ]);
  }),

  http.post("http://localhost:8000/api/payments", () => {
    return HttpResponse.json({ success: true });
  }),
];
