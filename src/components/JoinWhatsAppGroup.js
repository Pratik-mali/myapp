import React, { useEffect, useState } from 'react';
import './JoinWhatsAppGroup.css';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

const JoinWhatsAppGroup = () => {
  const [groups, setGroups] = useState([]); // State to store the WhatsApp groups
  const [selectedGroup, setSelectedGroup] = useState(null); // State to store selected group info for the popup

  // Fetch WhatsApp groups data from Firestore
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'whatsapp'));
        const groupsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGroups(groupsData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching groups: ", error);
      }
    };

    fetchGroups();
  }, []);

  // Function to open popup with group details
  const handleShowGroupInfo = (group) => {
    setSelectedGroup(group);
  };

  // Function to close popup
  const handleClosePopup = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="join-whatsapp-group">
      <h2>Join Our WhatsApp Groups</h2>
      {/* Render groups in table format */}
      <table className="group-table">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Group Info</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.name}</td>
              <td>
                <button className="group-info-button" onClick={() => handleShowGroupInfo(group)}>
                  View Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup for displaying group details */}
      {selectedGroup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>{selectedGroup.name}</h3>
            <p>District: {selectedGroup.district}</p>
            <p>Cast: {selectedGroup.cast}</p>
            <p>Group Admin: {selectedGroup.groupAdmin}</p>
            <p>Admin Mobile Number: {selectedGroup.adminMobileNumber}</p>
            <p>Group Info: {selectedGroup.info}</p>
            {/* Button to open WhatsApp group link */}
            <a href={selectedGroup.groupLink.startsWith('http') ? selectedGroup.groupLink : `http://${selectedGroup.link}`} target="_blank" rel="noopener noreferrer">
              <button className="group-link-button">Join Group</button>
            </a>
            <button onClick={handleClosePopup} className="close-button">X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinWhatsAppGroup;
