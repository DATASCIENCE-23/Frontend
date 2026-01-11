import TaxForm from "../components/Tax/TaxForm";
import TaxList from "../components/Tax/TaxList";

export default function TaxPage() {
  return (
    <div>
      <h2>Tax Management</h2>
      <TaxForm />
      <TaxList />
    </div>
  );
}
