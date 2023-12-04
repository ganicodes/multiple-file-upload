import { useState } from "react";
import { RiseLoader } from "react-spinners";
import { toast } from "react-toastify";
import MultipleFileUpload from "./MultipleFileUpload";

function App() {
  const [files, setFiles] = useState([]);
  const [fileUploadCompleted, setFileUploadCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSelectedCallback = (file) => {
    setFiles(file);
  };

  const uploadFiles = () => {
    setFileUploadCompleted(false);
    setLoading(true);
    let formdata = new FormData();

    files.forEach((file) => {
      formdata.append("file", file);
    });

    // add your API call here using formdata or you can also use FileReader to read files as dataURL and pass it to the upload end point

    // mocking the delay
    setTimeout(() => {
      toast.success("Files Uploaded successfully");
      setFileUploadCompleted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex gap-8 justify-center mt-[5%]">
        <MultipleFileUpload
          onSelectedCallback={onSelectedCallback}
          fileUploadCompleted={fileUploadCompleted}
        />

        {loading ? (
          <div className="mt-6">
            <RiseLoader color="#a855f7" loading={loading} />
          </div>
        ) : (
          <div className="">
            <button
              onClick={uploadFiles}
              className="bg-purple-500 font-bold px-4 py-2 mt-4 disabled:cursor-not-allowed disabled:bg-gray-500"
              disabled={!files.length || loading}
            >
              Upload files
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
