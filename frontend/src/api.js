const API_URL = "http://localhost:5000/api/equipment";

export async function fetchEquipment() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch equipment");
  }
  return res.json();
}
