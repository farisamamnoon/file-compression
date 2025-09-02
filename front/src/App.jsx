import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formSubmit = async () => {
      const formData = new FormData();
      formData.append("file", file);

      await fetch("/api/upload/", {
        body: formData,
        method: "POST",
      });
    };

    formSubmit();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/");
      const data = await res.json();

      setFileData(data);
    };

    function onFinishedEvent() {}

    socket.on("finished", onFinishedEvent);
    fetchData();
  }, []);

  return (
    <>
      <div>
        <ul>
          {fileData.length > 0 &&
            fileData.map((file) => (
              <>
                <h4>{file.title}</h4>
                <p>{file.status}</p>
              </>
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
