import React from "react";
import "./App.css";
import FileViewer from './components/file-viewer'

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <FileViewer
        fileType={'pdf'}
        filePath={`${process.env.PUBLIC_URL}/sample.pdf`}
      />
    </div>
  );
}

export default App;
