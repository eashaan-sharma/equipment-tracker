import { useEffect, useState } from "react";
import { fetchEquipment } from "./api";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEquipment()
      .then(data => {
        setEquipment(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load equipment");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Equipment Tracker</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>
                {new Date(item.lastCleanedDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
