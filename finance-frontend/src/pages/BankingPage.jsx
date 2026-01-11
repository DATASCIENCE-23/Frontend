import BankForm from "../components/Banking/BankForm";
import BankList from "../components/Banking/BankList";

export default function BankingPage() {
  return (
    <div>
      <h2>Bank Accounts</h2>
      <BankForm />
      <BankList />
    </div>
  );
}
