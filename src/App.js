import { useRef } from "react";
import logo from './logo.svg';
import './App.css';


function App() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if(file) {
      console.log("Selected file:", file);
      console.log("File name:", file.name);
      console.log("File Size:", file.size);
      console.log("File type:", file.type)
    }
  };

  return (
    <div className="App">
        <header className = "App-header">
          <h1>AI Document Analyzer</h1>
          ##ADD the rest here tomorrow
        </header>
    </div>
  );
}

export default App;
