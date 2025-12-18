const API_URL = "https://equipment-tracker-o3f8.onrender.com/api/equipment";

export async function fetchEquipment() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch equipment");
  }
  return res.json();
}

export async function createEquipment(data) {
  const res = await fetch("https://equipment-tracker-o3f8.onrender.com/api/equipment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to create equipment");
  }

  return res.json();
}

export async function updateEquipment(id, data) {
  const res = await fetch(`https://equipment-tracker-o3f8.onrender.com/api/equipment/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to update equipment");
  }

  return res.json();
}

export async function deleteEquipment(id) {
  const res = await fetch(`https://equipment-tracker-o3f8.onrender.com/api/equipment/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete equipment");
  }
}
