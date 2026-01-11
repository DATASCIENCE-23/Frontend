import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-4">
        <nav className="flex gap-6 text-blue-600 font-medium">
          <Link to="/">Invoices</Link>
          <Link to="/services">Services</Link>
          <Link to="/payments">Payments</Link>
        </nav>
      </header>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
