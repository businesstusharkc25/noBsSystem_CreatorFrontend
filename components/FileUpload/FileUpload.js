"use client";

import { useRef } from "react";

const FileUpload = ({
  acceptance = "",
  className = "",
  handleChange,
  fileName = "",
  handleFileRemove,
  defaultText = "Upload",
}) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <button
        className={`no_bs_creator_button_variant_1 px-3 py-1 flex items-center bg-[#1D341B] ${className}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <span
          title={fileName || defaultText}
          className="truncate max-w-xs text-center w-[100%]"
        >
          {fileName ? fileName : defaultText}
        </span>
        {fileName && (
          <img
            height={20}
            width={20}
            src="/assets/icons/trash_icon.svg"
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              hiddenFileInput.current.value = null;
              handleFileRemove();
            }}
          />
        )}
      </button>

      <input
        accept={acceptance}
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        hidden
      />
    </>
  );
};

export default FileUpload;
