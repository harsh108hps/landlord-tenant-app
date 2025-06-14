// src/pages/ScheduleMaintenance.jsx
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ref, push } from "firebase/database";
import { db, auth } from "../firebase";

const ScheduleMaintenance = () => {
  const [issue, setIssue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issue || !selectedDate) return;

    const appointmentRef = ref(db, "appointments");
    await push(appointmentRef, {
      tenantId: auth.currentUser.uid,
      issue,
      selectedSlot: selectedDate.toISOString(),
      status: "Pending",
    });

    setIssue("");
    setSelectedDate(null);
    alert("Appointment request sent!");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Schedule Maintenance</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-2 mb-4"
          placeholder="Describe the issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeIntervals={30}
          minDate={new Date()}
          dateFormat="Pp"
          className="border p-2 w-full"
          placeholderText="Choose date & time"
        />
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ScheduleMaintenance;
