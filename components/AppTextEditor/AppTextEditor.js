"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import useQuillsSettings from "./hooks/useQuillsSettings";

const AppTextEditor = ({
  onChangeFunction = () => {},
  className,
  addImage,
  value,
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [initialRender, setInitialRender] = useState(false);
  useEffect(() => {
    setInitialRender(true);
  }, []);

  const { modules, formats } = useQuillsSettings({ addImage });

  return (
    <div>
      {initialRender && (
        <ReactQuill
          id="editor"
          className={`text-white ${className}`}
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={onChangeFunction}
          value={value}
        />
      )}
    </div>
  );
};

export default AppTextEditor;
