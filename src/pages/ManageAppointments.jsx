import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, update } from "firebase/database";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const appointmentRef = ref(db, "appointments");
    const unsubscribe = onValue(appointmentRef, (snapshot) => {
      const data = snapshot.val();
      const formatted = data
        ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
        : [];
      setAppointments(formatted);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = (id, status) => {
    update(ref(db, `appointments/${id}`), {
      status,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Maintenance Appointments</h2>
      {appointments.map((appt) => (
        <div key={appt.id} className="border p-4 mb-3 bg-white rounded shadow">
          <p><strong>Tenant ID:</strong> {appt.tenantId}</p>
          <p><strong>Issue:</strong> {appt.issue}</p>
          <p><strong>Requested Slot:</strong> {new Date(appt.selectedSlot).toLocaleString()}</p>
          <p><strong>Status:</strong> {appt.status}</p>

          <div className="mt-2 space-x-2">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => updateStatus(appt.id, "Approved")}
            >
              Approve
            </button>
            <button
              className="bg-yellow-600 text-white px-3 py-1 rounded"
              onClick={() => updateStatus(appt.id, "Rescheduled")}
            >
              Mark Rescheduled
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageAppointments;
