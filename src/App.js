import { useRef, useState } from "react";
import './App.css';


function App() {
  const fileInputRef = useRef(null);                      /* variable */
  const [selectedFile, setSelectedFile] = useState(null); /* Array containing 2 elements */
  const [pdfText, setPdfText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

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

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected")
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile)

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });
       const data = await response.json();

       console.log("Upload Successful");
       console.log(data);

      setPdfText(data.text);

    } catch (error) {
      console.error("Upload failed:", error);
    }
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
            {pdfText &&(
              <div> 
                <h2>Extracted Text</h2>
                <pre>{pdfText}</pre>
              </div>
          )}
          </div>

        )}

        <div className="job-description">
          <h2>Job Description</h2>
            <textarea 
            rows="15" 
            cols="70" 
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}>

            </textarea>
        </div>


      </header>
    </div>
  );
}

export default App;
