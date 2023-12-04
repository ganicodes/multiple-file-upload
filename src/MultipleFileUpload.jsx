import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MultipleFileUpload({ onSelectedCallback, fileUploadCompleted }) {
  const maxFiles = 5;
  const maxFileSize = 5242880;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);

  useEffect(() => {
    onSelectedCallback(selectedFiles);
  }, [onSelectedCallback, selectedFiles]);

  useEffect(() => {
    setSelectedFiles([]);
    setRejectedFiles([]);
  }, [fileUploadCompleted]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setRejectedFiles(rejectedFiles);

      // check if the limit is exceeding => maxFiles = 5
      if (selectedFiles.length + acceptedFiles.length > maxFiles) {
        toast.warning(`Maximum ${maxFiles} files are allowed`);
        return;
      }

      // check if the selected file already exist in selectedFiles
      if (
        acceptedFiles?.length &&
        acceptedFiles
          .map((file) => file.name)
          .every((name) =>
            selectedFiles.map((file) => file.name).includes(name)
          )
      ) {
        toast.warning("🦄 Already exists", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      let newFiles = selectedFiles;
      newFiles.push(acceptedFiles);
      setSelectedFiles(newFiles.flat(1));
    },
    [selectedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: maxFiles,
    minSize: 0,
    maxSize: maxFileSize,
    // disabled: selectedFiles?.length >= maxFiles,
  });

  const removeSelectedFile = (fileName) => {
    setSelectedFiles((olderFiles) =>
      olderFiles.filter((file) => file.name != fileName)
    );
  };

  const convertKbToMb = (fileSizeInKb) =>
    (fileSizeInKb / 1000 / 1024).toFixed(1);

  return (
    <section className="">
      <div
        {...getRootProps()}
        className={`border max-w-xl overflow-x-hidden border-dashed border-gray-50 px-4 py-2 cursor-default rounded`}
        // ${ selectedFiles?.length >= maxFiles ? "cursor-not-allowed" : ""}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="text-center">
            <ion-icon
              style={{ fontSize: "1.5rem" }}
              name="cloud-upload-outline"
            ></ion-icon>
            <p>{"Drag & drop some files here, or click to select files"}</p>
            {/* <small>
              <em>(Maximum 5 files allowed each of size upto 5 MB)</em>
            </small> */}
          </div>
        )}
      </div>
      <div className="">
        {selectedFiles.length ? (
          <div className="mt-4 text-left">
            <h1>Selected files</h1>
            {selectedFiles?.map((file, index) => (
              <li key={index}>
                {file.name} {"("} {convertKbToMb(file.size)} {"MB )"}
                <span
                  className="ml-4 text-xl text-red-500 hover:text-red-600 cursor-pointer"
                  onClick={() => removeSelectedFile(file.name)}
                >
                  {" "}
                  &times;
                </span>
              </li>
            ))}
          </div>
        ) : null}
        {rejectedFiles.length ? (
          <div className="mt-4 text-left">
            <h1>Rejected files</h1>
            {rejectedFiles?.map(({ file, errors }) => (
              <li key={file.path}>
                {file.path} - {"("} {convertKbToMb(file.size)} {"MB )"}
                <ul>
                  {errors.map((e) => (
                    <li key={e.code}>{e.message}</li>
                  ))}
                </ul>
              </li>
            ))}
          </div>
        ) : null}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
}
export default MultipleFileUpload;

MultipleFileUpload.propTypes = {
  onSelectedCallback: PropTypes.func.isRequired,
  fileUploadCompleted: PropTypes.bool,
};
