import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FinanceDashboard from "./pages/FinanceDashboard";
import AccountingPage from "./pages/AccountingPage";
import ExpensePage from "./pages/ExpensePage";
import AssetPage from "./pages/AssetPage";
import BillingPage from "./pages/BillingPage";
import JournalPage from "./pages/JournalPage";
import BudgetPage from "./pages/BudgetPage";
import BankingPage from "./pages/BankingPage";
import TaxPage from "./pages/TaxPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FinanceDashboard />} />
        <Route path="/accounts" element={<AccountingPage />} />
        <Route path="/expenses" element={<ExpensePage />} />
        <Route path="/assets" element={<AssetPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/bank" element={<BankingPage />} />
        <Route path="/tax" element={<TaxPage />} />

      </Routes>
    </BrowserRouter>
  );
}
