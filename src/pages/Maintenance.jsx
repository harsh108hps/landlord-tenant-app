import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { auth, database } from "../firebase";
import { ref, push } from "firebase/database";
import dayjs from "dayjs";

const commonIssues = [
  "Leaky faucet",
  "Power outage",
  "Broken window",
  "Clogged drain",
  "No hot water",
  "AC not working",
  "Heating issue",
];

const Maintenance = () => {
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (value.length > 1) {
      const filtered = commonIssues.filter((issue) =>
        issue.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const validateForm = () => {
    if (!category || !urgency || description.length < 5) {
      setError("Please complete all fields with valid data.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError("");

    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to submit a request.");
      return;
    }

    const request = {
      category,
      urgency,
      description,
      date: dayjs().toISOString(),
      status: "Pending",
      tenantEmail: user.email,
      tenantId: user.uid,
      tenantName: user.displayName || "Unknown",
      fileNames: files.map((f) => f.name),
    };

    try {
      await push(ref(database, "maintenanceRequests"), request);
      setSubmitted(true);
      setCategory("");
      setUrgency("");
      setDescription("");
      setFiles([]);
      setSuggestions([]);
    } catch (err) {
      console.error("Error submitting request:", err);
      setError("Failed to submit request. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        🛠 Report a Maintenance Issue
      </h2>

      {submitted && (
        <div className="flex items-center gap-2 bg-green-100 p-3 rounded mb-4 text-green-700">
          <CheckCircle2 className="w-5 h-5" />
          <span>Request submitted successfully!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 bg-red-100 p-3 rounded mb-4 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select category</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Urgency</label>
          <div className="flex gap-3">
            {["Low", "Medium", "High"].map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="urgency"
                  value={level}
                  checked={urgency === level}
                  onChange={(e) => setUrgency(e.target.value)}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Describe the issue in detail..."
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
          {suggestions.length > 0 && (
            <ul className="mt-2 bg-gray-100 rounded p-2 text-sm">
              <li className="font-semibold">Suggestions:</li>
              {suggestions.map((s, idx) => (
                <li key={idx} className="text-gray-700">{s}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Images or Videos</label>
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-300 p-6 rounded text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-sm text-gray-500">Drag & drop or click to upload files</p>
          </div>
          <ul className="mt-2 text-sm text-gray-600">
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default Maintenance;
