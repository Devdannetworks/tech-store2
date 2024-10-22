import React, { useCallback, useEffect, useState } from "react";
import { ImageType } from "../AddProductForm";
import SelectImage from "./SelectImage";
import ButtonComp from "../Button";
import { TruncateText } from "../../Actions/ExportedFunctions/Functions";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [selected, setIsSelected] = useState(false);
  const [files, setFiles] = useState<File[]>([]); // Updated to handle multiple files

  useEffect(() => {
    if (isProductCreated) {
      setFiles([]);
      setIsSelected(false);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback(
    (value: File[]) => {
      console.log(value);
      setFiles((prevFiles) => [...prevFiles, ...value]); // Append new files to the existing ones
      addImageToState({ ...item, image: [...files, ...value] }); // Update the state with the new image
    },
    [addImageToState, item, files]
  );

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);

      if (!e.target.checked) {
        setFiles([]);
        removeImageFromState({ ...item, image: [] }); // Clear image when deselected
      }
    },
    [item, removeImageFromState]
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index); // Remove the selected image
      setFiles(updatedFiles);
      removeImageFromState({ ...item, image: files }); // Update state with the remaining image
    },
    [files, item, removeImageFromState]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto border-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          id={item.color}
          type="checkbox"
          checked={selected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label className="font-medium cursor-pointer">{item.color}</label>
      </div>
      <>
        {selected && !files.length && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {files.length > 0 && (
          <div className="flex flex-col gap-2 col-span-2 items-start justify-between">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-2 text-sm items-start md:items-center justify-between w-full"
              >
                <div>{TruncateText(file.name)}</div>
                <div className="w-[70px]">
                  <ButtonComp
                    label="Remove"
                    small
                    outline
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              </div>
            ))}
            <div className="text-center">
              <SelectImage item={item} handleFileChange={handleFileChange} />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
