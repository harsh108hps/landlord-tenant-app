import { useEffect, useState } from "react";
import { ref, onValue, get } from "firebase/database";
import { database, auth } from "../firebase";
import dayjs from "dayjs";

const IssueTracker = () => {
  const [issues, setIssues] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = ref(database, `users/${currentUser.uid}`);
        const snap = await get(userRef);
        const role = snap.exists() ? snap.val().role : "tenant";
        setRole(role);

        const issueRef = ref(database, "maintenanceRequests");
        onValue(issueRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const allIssues = Object.entries(data).map(([id, issue]) => ({
              id,
              ...issue,
            }));
            const filtered =
              role === "landlord"
                ? allIssues
                : allIssues.filter(
                    (item) => item.tenantEmail === currentUser.email
                  );
            setIssues(filtered);
          } else {
            setIssues([]);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
        setIssues([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🛠️ Issue Tracker</h2>
      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <p>Loading maintenance requests...</p>
        ) : issues.length === 0 ? (
          <p>No maintenance requests found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="py-2 px-3">Tenant</th>
                <th className="py-2 px-3">Issue</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Requested On</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="border-b">
                  <td className="py-2 px-3">{issue.tenantName || "N/A"}</td>
                  <td className="py-2 px-3">{issue.description}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`text-sm font-medium ${
                        issue.status === "Completed"
                          ? "text-green-600"
                          : issue.status === "In Progress"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    {dayjs(issue.date).format("MMM D, YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IssueTracker;
