import { useEffect, useState } from "react";
import "./App.css";
import socket from "./socket";

function App() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:3000/api/upload/", {
      body: formData,
      method: "POST",
    });
    setFile(null);
    fetchData();
  };

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/");
    const data = await res.json();

    setFileData(data.data);
  };

  useEffect(() => {
    fetchData();

    socket.on("finished", fetchData);

    return () => {
      socket.off("finished", fetchData);
    };
  }, []);

  return (
    <>
      <div>
        <ul>
          {fileData.length > 0 &&
            fileData.map((file, i) => (
              <li key={`file-no-${i}`}>
                <h4>File Name: {file.title}</h4>
                <p>Status: {file.status}</p>
                <p>File size: {file.size} Bytes</p>
              </li>
            ))}
        </ul>
      </div>
      <br />
      <br />
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          Insert file here
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            multiple
          />
          <button type="submit">send</button>
        </form>
      </div>
    </>
  );
}

export default App;
