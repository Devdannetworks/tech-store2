import React, { useCallback } from "react";
import { ImageType } from "../AddProductForm";
import { useDropzone } from "react-dropzone";

interface SelectImageProps {
  item: ImageType;
  handleFileChange: (Value: File[]) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({
  item,
  handleFileChange,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFileChange(acceptedFiles);
      console.log(acceptedFiles);
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal
       text-slate-400 flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>+ {item.color} Image</p>
      )}
    </div>
  );
};

export default SelectImage;
