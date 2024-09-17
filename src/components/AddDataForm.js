// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC37Ze0VqeG03EoRJbaAqo7eyifioHnN0",
  authDomain: "cvmachine-74913.firebaseapp.com",
  projectId: "cvmachine-74913",
  storageBucket: "cvmachine-74913.appspot.com",
  messagingSenderId: "463176878357",
  appId: "1:463176878357:web:b9314ca1ffd5a51a2dc11c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddDataForm = () => {
  // State variables to hold the input values
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [cast, setCast] = useState("");
  const [groupAdmin, setGroupAdmin] = useState("");
  const [adminMobileNumber, setAdminMobileNumber] = useState("");
  const [groupLink, setGroupLink] = useState(""); // New group link field
  const [status, setStatus] = useState(""); // For form status feedback

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new document to the "whatsapp" collection with the provided form data
      await addDoc(collection(db, "whatsapp"), {
        name: name,
        district: district,
        cast: cast,
        groupAdmin: groupAdmin,
        adminMobileNumber: adminMobileNumber,
        groupLink: groupLink, // Add group link to the Firestore document
      });

      setStatus("Data added successfully to the WhatsApp collection!");
      // Reset form fields
      setName("");
      setDistrict("");
      setCast("");
      setGroupAdmin("");
      setAdminMobileNumber("");
      setGroupLink("");
    } catch (e) {
      setStatus(`Error adding data: ${e.message}`);
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h2>Add Data to WhatsApp Collection in Firebase</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            District:
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Cast:
            <input
              type="text"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Group Admin:
            <input
              type="text"
              value={groupAdmin}
              onChange={(e) => setGroupAdmin(e.target.value)}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Admin Mobile Number:
            <input
              type="text"
              value={adminMobileNumber}
              onChange={(e) => setAdminMobileNumber(e.target.value)}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Group Link:
            <input
              type="url"
              value={groupLink}
              onChange={(e) => setGroupLink(e.target.value)}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Data
        </button>
      </form>
      {status && <p>{status}</p>} {/* Display the status message */}
    </div>
  );
};

export default AddDataForm;
