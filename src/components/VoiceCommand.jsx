import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { submitRequest } from "../utils/submitRequest";

const VoiceCommand = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.toLowerCase().includes("submit")) {
      submitRequest(transcript).then(() =>
        alert("Maintenance request submitted: " + transcript)
      );
      resetTranscript();
    } else if (transcript.toLowerCase().includes("status")) {
      // You can trigger a function to fetch status from Firebase
      alert("Fetching status for: " + transcript);
      resetTranscript();
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support voice recognition.</span>;
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded text-center">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={SpeechRecognition.startListening}
      >
        🎤 Start Voice Command
      </button>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {listening ? "Listening..." : "Click the button and say a command."}
      </p>
      <p className="mt-1 font-medium text-gray-700 dark:text-white">{transcript}</p>
    </div>
  );
};

export default VoiceCommand;
