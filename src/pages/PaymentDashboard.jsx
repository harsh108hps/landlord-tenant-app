import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const PaymentDashboard = ({ landlordId }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "rentPayments"), where("landlordId", "==", landlordId));
      const snapshot = await getDocs(q);
      setPayments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, [landlordId]);

  const sendReminder = (tenantId) => {
    // Implement notification logic or toast
    alert(`Reminder sent to tenant ${tenantId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Landlord Payment Dashboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th>Tenant</th><th>Amount</th><th>Status</th><th>Due Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className="border-b">
              <td>{p.tenantId}</td>
              <td>₹{p.amount}</td>
              <td>{p.status}</td>
              <td>{p.dueDate}</td>
              <td>
                {p.status !== "paid" && (
                  <button onClick={() => sendReminder(p.tenantId)} className="bg-blue-500 text-white px-2 py-1 rounded">Send Reminder</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentDashboard;
