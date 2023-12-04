import { useState } from "react";
import MultipleFileUpload from "./MultipleFileUpload";

function App() {
  const [files, setFiles] = useState([]);
  const [fileUploadCompleted, setFileUploadCompleted] = useState(false);
  const onSelectedCallback = (file) => {
    setFiles(file);
  };

  const uploadFiles = () => {
    let formdata = new FormData();

    files.forEach((file) => {
      formdata.append("file", file);
    });

    console.log("formdata", formdata);
    setFileUploadCompleted(true);
  };

  return (
    <div className="flex gap-8 justify-center mt-[5%]">
      <MultipleFileUpload
        onSelectedCallback={onSelectedCallback}
        fileUploadCompleted={fileUploadCompleted}
      />
      <div className="">
        <button
          onClick={uploadFiles}
          className="bg-purple-500 font-bold px-4 py-2 mt-4 disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={!files.length}
        >
          Upload files
        </button>
      </div>
    </div>
  );
}

export default App;
