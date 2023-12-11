import React from 'react';

const Modal = ({ isOpen, onCancel, onConfirm, newEmployeeId, setNewEmployeeId, newProjectName, setNewProjectName }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '16px', border: '1px solid #ccc', backgroundColor: '#fff', zIndex: 1000 }}>
      <h2>Enter Employee ID and Project Name</h2>
      <label>
        Employee ID:
        <input type="text" value={newEmployeeId} onChange={(e) => setNewEmployeeId(e.target.value)} />
      </label>
      <br />
      <label>
        Project Name:
        <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
      </label>
      <br />
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Save</button>
    </div>
  );
};

export default Modal;
