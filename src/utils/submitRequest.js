import { ref, push } from "firebase/database";
import { database } from "../firebase";

/**
 * Submit a maintenance or support request to Firebase Realtime Database
 * @param {Object} requestData - Request details like type, urgency, message, etc.
 * @returns {Promise<string>} - Firebase key of new request
 */
export const submitRequest = async (requestData) => {
  try {
    const requestRef = ref(database, "requests/");
    const newRequestRef = await push(requestRef, {
      ...requestData,
      timestamp: new Date().toISOString(),
    });
    console.log("Request submitted with ID:", newRequestRef.key);
    return newRequestRef.key;
  } catch (error) {
    console.error("Error submitting request:", error);
    throw error;
  }
};
