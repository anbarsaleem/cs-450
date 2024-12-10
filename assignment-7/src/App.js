import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Visualization from "./Visualization";

function App() {
  const [data, setData] = useState(null);

  const handleDataUpload = (jsonData) => {
    console.log(jsonData)
    setData(jsonData);
  };

  return (
    <div>
      <FileUpload onUpload={handleDataUpload} />
      {data && <Visualization tweetsData={data} />}
    </div>
  );
}

export default App;