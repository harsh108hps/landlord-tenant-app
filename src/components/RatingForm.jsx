// src/components/RatingForm.jsx
import { useState } from "react";
import { ref, set } from "firebase/database";
import { database, auth } from "../firebase";

const RatingForm = ({ targetUserId, targetUserType }) => {
  // targetUserId = UID of user to be rated
  // targetUserType = "tenant" or "landlord" (the role of the rated user)

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setMessage("Please select a rating between 1 and 5.");
      return;
    }

    const raterId = auth.currentUser.uid;
    if (!raterId) {
      setMessage("You must be logged in to submit a rating.");
      return;
    }

    // Build database path:
    // If you rate a landlord, store under ratings/landlords/<landlordUID>/<tenantUID>
    // If you rate a tenant, store under ratings/tenants/<tenantUID>/<landlordUID>
    const path =
      targetUserType === "landlord"
        ? `ratings/landlords/${targetUserId}/${raterId}`
        : `ratings/tenants/${targetUserId}/${raterId}`;

    try {
      await set(ref(database, path), {
        rating,
        comment,
        timestamp: Date.now(),
      });
      setMessage("Thanks for your feedback!");
      setRating(0);
      setComment("");
    } catch (error) {
      setMessage("Error submitting rating. Try again later.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Give a Rating</h3>

      <label className="block mb-2 font-medium">Rating (1 to 5 stars)</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full mb-4 p-2 border rounded"
        required
      >
        <option value={0}>Select rating</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Comment (optional)</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Write your feedback here..."
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </form>
  );
};

export default RatingForm;
