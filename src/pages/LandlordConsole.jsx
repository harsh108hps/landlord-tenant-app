import { useEffect, useState } from "react";
import { database, auth } from "../firebase";
import { ref, get, update } from "firebase/database";

const LandlordConsole = () => {
  const [properties, setProperties] = useState({});
  const [uid, setUid] = useState(null);

  // Step 1: Wait until auth is ready and set UID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Step 2: Once UID is available, fetch properties
  useEffect(() => {
    if (uid) {
      const landlordRef = ref(database, `users/${uid}/properties`);
      get(landlordRef).then((snapshot) => {
        if (snapshot.exists()) {
          setProperties(snapshot.val());
        } else {
          setProperties({}); // Ensure blank if no data
        }
      });
    }
  }, [uid]);

  const handleChange = (key, field, value) => {
    setProperties((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleSave = (key) => {
    if (!uid) return;

    update(ref(database, `users/${uid}/properties/${key}`), properties[key]);
    alert("Property updated!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Landlord Console</h2>

      {Object.keys(properties).length === 0 && (
        <p className="text-gray-500">No properties found or loading...</p>
      )}

      {Object.entries(properties).map(([key, prop]) => (
        <div key={key} className="border-b mb-4 pb-4">
          <h3 className="font-semibold text-lg">{prop.name || "Unnamed Property"}</h3>

          <input
            placeholder="Name"
            value={prop.name || ""}
            onChange={(e) => handleChange(key, "name", e.target.value)}
            className="border p-2 mb-2 w-full"
          />

          <input
            placeholder="Rent"
            type="number"
            value={prop.rent || ""}
            onChange={(e) => handleChange(key, "rent", e.target.value)}
            className="border p-2 mb-2 w-full"
          />

          <input
            placeholder="Tenant ID"
            value={prop.tenantId || ""}
            onChange={(e) => handleChange(key, "tenantId", e.target.value)}
            className="border p-2 mb-2 w-full"
          />

          <select
            value={prop.contactPreference || "email"}
            onChange={(e) => handleChange(key, "contactPreference", e.target.value)}
            className="border p-2 mb-2 w-full"
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>

          <button
            onClick={() => handleSave(key)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Property
          </button>
        </div>
      ))}
    </div>
  );
};

export default LandlordConsole;
