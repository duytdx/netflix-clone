import React, { useState, useCallback } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import Loader from "./Notfications/Loader";
import uploadImageService from "../Redux/APIs/ImageUploadService";

function Uploader({ setImageUrl }) {
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = new FormData();
    file.append("file", acceptedFiles[0]);
    try {
      const data = await uploadImageService(file, setLoading);
      if (data) {
        if (typeof data === 'string') {
          setImageUrl(data);
        }
        else if (data.url) {
          setImageUrl(data.url);
        }
        else if (data.image) {
          setImageUrl(data.image);
        }
        else if (data.data && data.data.url) {
          setImageUrl(data.data.url);
        }
        else {
          console.error("Unexpected response format:", data);
          setFileError("Invalid response from server");
        }
      } else {
        console.error("Empty response from server");
        setFileError("Failed to get image URL from server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setFileError("Failed to upload image");
    }
  }, [setImageUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === 'file-too-large') {
          setFileError('File is too large. Maximum size is 5MB');
        } else if (error.code === 'file-invalid-type') {
          setFileError('Invalid file type. Please upload JPEG, PNG or GIF');
        } else {
          setFileError(error.message);
        }
      }
    }
  });

  return (
    <div className="w-full text-center flex-col gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`px-6 py-8 border-2 ${isDragActive ? 'border-[#E50914]' : 'border-[#404040]'
            } border-dashed bg-main rounded-lg cursor-pointer transition duration-300 hover:border-[#E50914] hover:bg-[#1f1f1f]`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-4">
            <span className="w-16 h-16 rounded-full bg-[#E50914] bg-opacity-10 flex items-center justify-center">
              <FiUploadCloud className="text-3xl text-[#E50914]" />
            </span>

            <div className="space-y-2">
              <p className="text-white text-lg font-semibold">
                {isDragActive ? "Drop your image here" : "Drag & Drop your image"}
              </p>
              <p className="text-sm text-gray-400">or</p>
              <button className="px-6 py-2 text-sm text-white bg-[#E50914] rounded-md hover:bg-[#b81d24] transition duration-300">
                Browse Files
              </button>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <p>Accepted file types: JPEG, PNG</p>
              <p>Maximum file size: 5MB</p>
            </div>
          </div>
        </div>
      )}

      {fileError && (
        <div className="mt-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-md">
          <p className="text-sm text-red-500">{fileError}</p>
        </div>
      )}
    </div>
  );
}

export default Uploader;
