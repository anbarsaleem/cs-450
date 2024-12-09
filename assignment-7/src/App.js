import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Visualization from './Visualization';

function App() {
  const [uploadedTweets, setUploadedTweets] = useState([]);

  // This will be called by FileUpload once the user has uploaded and parsed the file
  const handleFileUpload = (data) => {
    setUploadedTweets(data);
  };

  return (
    <div>
      <FileUpload onUpload={handleFileUpload} />
      {/* Only render the visualization if we have uploaded tweets */}
      {uploadedTweets.length > 0 && (
        <Visualization tweetsData={uploadedTweets} />
      )}
    </div>
  );
}

export default App;