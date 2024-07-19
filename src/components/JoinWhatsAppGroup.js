import React from 'react';
import './JoinWhatsAppGroup.css';

const JoinWhatsAppGroup = () => {
  const groups = [
    { name: 'Group 1', link: 'https://chat.whatsapp.com/XXXXXX' },
    { name: 'Group 2', link: 'https://chat.whatsapp.com/YYYYYY' },
    { name: 'Group 3', link: 'https://chat.whatsapp.com/ZZZZZZ' }
  ];

  return (
    <div className="join-whatsapp-group">
      <h2>Join Our WhatsApp Groups</h2>
      <div className="group-buttons">
        {groups.map((group, index) => (
          <a key={index} href={group.link} target="_blank" rel="noopener noreferrer">
            <button className="group-button">{group.name}</button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default JoinWhatsAppGroup;
