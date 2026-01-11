import JournalForm from "../components/Journal/JournalForm";
import JournalList from "../components/Journal/JournalList";

export default function JournalPage() {
  return (
    <div className="page-container">
      <h2>Journal Entries</h2>
      <JournalForm />
      <JournalList />
    </div>
  );
}
