import { ai } from "../assets";
import { GalleryImages } from "../config/constants";
import CustomButton from "./CustomButton";
import { useState } from "react";

const FilePicker = ({ file, setFile, readFile }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [active, setActive] = useState(null);
  let tab = showGallery ? "choose" : "upload";
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="flex justify-between">
          <label
            htmlFor="file-upload"
            className="filepicker-label"
            onClick={() => setShowGallery(false)}
          >
            Upload File
          </label>
          <button
            className="filepicker-label"
            onClick={() => setShowGallery(true)}
          >
            Choose file
          </button>
        </div>

        {!showGallery ? (
          <p className="mt-2 text-gray-500 text-xs truncate">
            {file === "" ? "No file selected" : file.name}
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-1 mt-1 ">
            {GalleryImages.map(({ name, src }, index) => (
              <img
                key={index}
                src={src}
                alt={name}
                className={`rounded w-full h-9 cursor-pointer hover:scale-125 shadow ${
                  active === index ? "border border-gray-400 scale-150" : ""
                }  `}
                onClick={(e) => {
                  setActive(index);
                  setFile(e.target.src);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo", tab)}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile("full", tab)}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
