import { useRef, useState } from "react";
import './App.css';


function App() {
  const fileInputRef = useRef(null);                      /* variable */
  const [selectedFile, setSelectedFile] = useState(null); /* Array containing 2 elements */

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {       /* creates an event object that is later passed  in the function*/
    const file = event.target.files[0]; /* gives the first selected file */ 

    if (file) {
      setSelectedFile(file);
      console.log("HANDLEFILE CHANGE")
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
    console.log("HANDLE UPLOAD")
    console.log("Selected file:", selectedFile);
    console.log("File name:", selectedFile.name);
    console.log("File Size:", selectedFile.size);
    console.log("File type:", selectedFile.type);
    console.log("Current time:", new Date().toLocaleTimeString());
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

            <button className="Button" onClick={handleUpload}> Upload Document </button>
          </div>
        )}


      </header>
    </div>
  );
}

export default App;
