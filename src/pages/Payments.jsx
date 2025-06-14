// pages/Payments.jsx
import { useState } from "react";
import { jsPDF } from "jspdf";

const Payments = () => {
  const [paymentDone, setPaymentDone] = useState(false);

  const tenantName = "Harsh Pratap"; // dynamically fetch from context or Firebase
  const invoiceNo = `INV-${Date.now()}`;
  const amount = 10000;
  const paidDate = new Date();

  const handlePayment = () => {
    setPaymentDone(true);
    // ✅ Optionally update payment status in Firebase here
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Rent Invoice", 80, 20);

    doc.setFontSize(12);
    doc.text(`Invoice #: ${invoiceNo}`, 20, 40);
    doc.text(`Tenant Name: ${tenantName}`, 20, 50);
    doc.text(`Paid Amount: ₹${amount}`, 20, 60);
    doc.text(`Payment Date: ${paidDate.toLocaleDateString()}`, 20, 70);
    doc.text("Thank you for your payment!", 20, 90);

    doc.save(`invoice-${invoiceNo}.pdf`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">💳 Rent Payments</h2>

      <div className="bg-white shadow rounded p-6 space-y-4">
        <p className="text-gray-800 font-medium">🏠 Property: Flat 203, Sunshine Residency</p>
        <p className="text-green-600">✅ Last Payment: ₹10,000 on May 5, 2025</p>
        <p className="text-red-600">⚠️ Next Due: ₹10,000 on July 5, 2025</p>

        {!paymentDone ? (
          <button
            onClick={handlePayment}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Mark as Paid
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-green-700 font-semibold">🎉 Payment Successful!</p>
            <button
              onClick={generateInvoice}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download Invoice PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
