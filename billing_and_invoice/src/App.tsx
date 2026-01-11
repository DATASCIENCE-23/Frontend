import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import InvoiceList from "./routes/InvoiceList";
import ServiceMaster from "./routes/ServiceMaster";
import InvoiceCreate from "./routes/InvoiceCreate";
import InvoiceDetail from "./routes/InvoiceDetail";
import PaymentCollect from "./routes/PaymentCollect";
import PaymentHistory from "./routes/PaymentHistory";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/services" element={<ServiceMaster />} />
        <Route path="/invoices/create" element={<InvoiceCreate />} />
        <Route path="/invoices/:id" element={<InvoiceDetail />} />
        <Route path="/payments/collect/:invoiceId" element={<PaymentCollect />} />
        <Route path="/payments" element={<PaymentHistory />} />
      </Routes>
    </Layout>
  );
}
