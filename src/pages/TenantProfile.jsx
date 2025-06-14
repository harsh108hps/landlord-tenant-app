import { useEffect, useState } from "react";
import { ref, get, update } from "firebase/database";
import { database, auth } from "../firebase";
import { uploadBytes, getDownloadURL, ref as storageRef } from "firebase/storage";
import { storage } from "../firebase";

const TenantProfile = () => {
  const [profile, setProfile] = useState({});
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const userRef = ref(database, `users/${uid}`);
    get(userRef).then(snapshot => {
      if (snapshot.exists()) setProfile(snapshot.val());
    });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const storagePath = storageRef(storage, `avatars/${uid}`);
    await uploadBytes(storagePath, file);
    const url = await getDownloadURL(storagePath);
    setProfile((prev) => ({ ...prev, avatar: url }));
  };

  const handleSubmit = () => {
    update(ref(database, `users/${uid}`), profile);
    alert("Profile updated!");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Tenant Profile</h2>

      <input type="file" onChange={handleAvatarUpload} className="mb-4" />
      {profile.avatar && <img src={profile.avatar} className="w-20 h-20 rounded-full mb-4" />}

      <input
        name="displayName"
        value={profile.displayName || ""}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 mb-2 w-full"
      />

      <input
        name="phone"
        value={profile.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 mb-2 w-full"
      />

      <select
        name="preferredContact"
        value={profile.preferredContact || "email"}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
      >
        <option value="email">Email</option>
        <option value="sms">SMS</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default TenantProfile;
