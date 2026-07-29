import { useRef, useState } from "react";
import './App.css';


function App() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log("Selected file:", file);
      console.log("File name:", file.name);
      console.log("File Size:", file.size);
      console.log("File type:", file.type);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.log("No file selected")
      return;
    }
    console.log("Selected file:", selectedFile);
    console.log("File name:", selectedFile.name);
    console.log("File Size:", selectedFile.size);
    console.log("File type:", selectedFile.type);

  };



  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Document Analyzer</h1>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          style={{ display: "none" }}
        />

        {/* choose button */}
        <button className="Button" onClick={handleButtonClick}> Choose File </button>

        {/* Upload button */}
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>

            <button
              className="Button"
              onClick={handleUpload}
            >
              Upload Document
            </button>
          </div>
        )}


      </header>
    </div>
  );
}

export default App;
