import { Viewer, Worker } from "@react-pdf-viewer/core";
import React, { useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const [error, setError] = useState("");
  const [fileUrl, setFileUrl] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["application/pdf", "application/msword", "text/csv"];
    const maxSize = 50 * 1024 * 1024;
    if (!file) {
      setError("Please select a file.");
    } else if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, DOC, and CSV files are allowed.");
    } else if (file.size > maxSize) {
      setError("File size exceeds 50MB limit.");
    } else {
      setError("");
      const filePath = URL.createObjectURL(file);
      filePath.split(":");
      setFileUrl(filePath);
      window.localStorage.setItem("url", JSON.stringify(filePath));
      console.log("File Added");
      setFileSelected(true);
    }
  };
  return (
    <>
      <section className="flex flex-col gap-4">
        {fileSelected ? (
          <div className="flex flex-row gap-0 h-screen w-full">
            <div className="w-3/4 h-full">
              {fileUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer fileUrl={fileUrl} />
                </Worker>
              ) : null}
            </div>
            <div className="w-1/4 h-full border-l-2 border-red-900 flex justify-end items-end">
             <button className='bg-red-500 w-full h-12 m-8 text-xl font-bold font-mono text-white rounded-3xl'>
             <Link to='./ChatFile'> Upload </Link> </button>
            </div>
          </div>
        ) : (
          <div className="h-screen flex-col gap-4 flex justify-center items-center p-8">
            <div className="text-sans  text-center">
              <h1 className="font-bold text-5xl">Chat With PDF</h1>
              <p className="text-2xl">
                Upload PDF file to have a chat with it for a better
                understanding
              </p>
            </div>
            <form
              action=""
              onClick={() => {
                document.querySelector("#input-field").click();
              }}
              className="border-2 h-12 w-48 border-red-500 bg-red-500 rounded-3xl flex justify-center items-center cursor-pointer"
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.csv"
                id="input-field"
                hidden
              />
              <p className="text-xl font-bold font-mono text-white">
                Select PDF File
              </p>
            </form>
            {error && (
              <p className="text-red-600 font-serif text-lg">{error}</p>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default UploadPage;
