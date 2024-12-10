import React, { useState } from "react";

function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file before uploading!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target.result);
      onUpload(jsonData);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
      <h2>Upload a JSON File</h2>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ marginBottom: 10 }}
      />
      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
