// src/components/FeaturesHighlight.jsx
import React from "react";
import { Wrench, MessageSquareText, CreditCard, CalendarDays, BarChart } from "lucide-react";

const features = [
  {
    icon: <Wrench className="text-blue-600 w-8 h-8" />,
    title: "Maintenance Requests",
    description: "Easily report and track maintenance issues with real-time updates.",
  },
  {
    icon: <MessageSquareText className="text-green-600 w-8 h-8" />,
    title: "Instant Chat",
    description: "Communicate directly with tenants or landlords through live messaging.",
  },
  {
    icon: <CreditCard className="text-purple-600 w-8 h-8" />,
    title: "Rent Payments",
    description: "Track rent history, receive reminders, and manage dues transparently.",
  },
  {
    icon: <CalendarDays className="text-pink-600 w-8 h-8" />,
    title: "Schedule Visits",
    description: "Book maintenance or inspection appointments seamlessly.",
  },
  {
    icon: <BarChart className="text-orange-600 w-8 h-8" />,
    title: "Smart Dashboard",
    description: "Get summaries of all requests, payments, and chat in one place.",
  },
];

const FeaturesHighlight = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        🌟 Key Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
          >
            {feature.icon}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesHighlight;
