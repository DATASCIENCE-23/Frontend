import { useEffect, useState } from "react";
import { getJournals } from "../../api/journalApi";

export default function JournalList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getJournals().then(res => setData(res.data));
  }, []);

  return (
    <table>
      <tr>
        <th>ID</th><th>Ref Type</th><th>Description</th>
      </tr>
      {data.map(j => (
        <tr key={j.journal_id}>
          <td>{j.journal_id}</td>
          <td>{j.reference_type}</td>
          <td>{j.description}</td>
        </tr>
      ))}
    </table>
  );
}
