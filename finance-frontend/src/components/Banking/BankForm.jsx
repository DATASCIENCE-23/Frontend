import { createBank } from "../../api/bankApi";

export default function BankForm() {
  return (
    <div className="card">
      <h3>Add Bank Account</h3>
      <input placeholder="Account Number" />
      <input placeholder="Bank Name" />
      <input placeholder="Balance" />
      <button onClick={createBank}>Save</button>
    </div>
  );
}
