import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const PaymentHistory = ({ userId }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const q = query(collection(db, "rentPayments"), where("tenantId", "==", userId));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPayments(data);
    };
    fetchPayments();
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Rent Payment History</h2>
      <ul className="space-y-2">
        {payments.map(p => (
          <li key={p.id} className="border p-3 rounded shadow">
            <p>Amount: ₹{p.amount}</p>
            <p>Status: <span className={`text-${p.status === "paid" ? "green" : "red"}-500`}>{p.status}</span></p>
            <p>Due Date: {p.dueDate}</p>
            <p>Paid On: {p.paymentDate || "Not Paid"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
