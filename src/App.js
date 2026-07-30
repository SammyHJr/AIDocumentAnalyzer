import { useRef, useState } from "react";
import './App.css';


function App() {
  const fileInputRef = useRef(null);                      /* variable */
  const [selectedFile, setSelectedFile] = useState(null); /* Array containing 2 elements */
  const [pdfText, setPdfText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);

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

  const handleAnalyze = async () => {
    if(!pdfText) {
      alert("Please upload a resume!");
      return;
    }

    if(!jobDescription) {
      alert("Please enter a job description");
      return;
    }

    try {
      const reponse = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: pdfText,
          job_description: jobDescription
        }),
      });

      const data = await reponse.json();

      console.log("Analysis Response:");
      setAnalysis(data);
    } catch (error    ) {
      console.error(error);
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
            <button className="Button" onClick={handleAnalyze}>Analyze Resume</button>
        </div>

        {analysis && (
            <div>
              <h2>Analysis</h2>
              
              <h3>Match Score</h3>
              <p>{analysis.match_score}%</p>

              <h3>Matching Skills</h3>
              <ul>
                {analysis.missing_skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>

              <h3>Suggestions</h3>
              <ul>
                {analysis.suggestions.map((suggestions) =>(
                  <li key={suggestions}> {suggestions}</li>
                ))}
              </ul>
            </div>
           )}

      </header>
    </div>
  );
}

export default App;
