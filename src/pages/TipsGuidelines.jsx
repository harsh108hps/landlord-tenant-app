// src/pages/TipsGuidelines.jsx
import { useState } from "react";

const sections = [
  {
    title: "🏡 How to Maintain Your Flat",
    content: "Keep it clean, avoid moisture damage, dispose garbage properly, and report repairs early.",
  },
  {
    title: "📜 Tenant Rights",
    content: "You have the right to a habitable home, privacy, proper notice before eviction, and rent receipts.",
  },
  {
    title: "📞 Emergency Contact Numbers",
    content: "Fire: 101 | Police: 100 | Ambulance: 102 | Local Electrician: 9876543210",
  },
];

const TipsGuidelines = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">📝 Tips & Guidelines</h2>
      <div className="max-w-3xl mx-auto">
        {sections.map((sec, idx) => (
          <div key={idx} className="mb-4">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left px-6 py-4 bg-white rounded-lg shadow hover:bg-indigo-50 transition font-semibold text-lg text-indigo-700"
            >
              {sec.title}
            </button>
            {openIndex === idx && (
              <div className="bg-white p-4 rounded-b-lg shadow text-gray-800">
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsGuidelines;
