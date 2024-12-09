import React from 'react';

function FileUpload({ onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target.result);
      // Once we have the data, pass it up to App
      onUpload(jsonData);
    };
    reader.readAsText(file);
  };

    return (
      <div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
        <h2>Upload a JSON File</h2>
        <input type="file" accept=".json" onChange={handleFileChange} />
      </div>
    );
  }

export default FileUpload;
