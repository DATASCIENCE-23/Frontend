import { Link } from "react-router-dom";

export default function FinanceDashboard() {
  return (
    <div className="dashboard">
      <h1 className="title">Finance Module</h1>
      <p className="subtitle">Manage all financial operations in one place</p>

      <div className="grid">
        <Link className="card-link" to="/accounts">Accounts</Link>
        <Link className="card-link" to="/expenses">Expenses</Link>
        <Link className="card-link" to="/assets">Assets</Link>
        <Link className="card-link" to="/billing">Billing</Link>

        <Link className="card-link" to="/journal">Journal</Link>
        <Link className="card-link" to="/budget">Budget</Link>
        <Link className="card-link" to="/bank">Banking</Link>
        <Link className="card-link" to="/tax">Tax</Link>
      </div>
    </div>
  );
}
