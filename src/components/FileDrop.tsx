import { fileAtom } from "@/lib/atoms";
import { IconFileUpload } from "@tabler/icons-react";
import clsx from "clsx/lite";
import { useSetAtom } from "jotai";
import React, { useCallback } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

const FileDrop: React.FC = () => {
  const setFileAtom = useSetAtom(fileAtom);
  const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
    async (acceptedFiles) => {
      if (acceptedFiles.length != 1) return;

      const [file] = acceptedFiles;
      setFileAtom(file);
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".excalidraw"],
    },
    multiple: false,
  });

  return (
    <button className="flex flex-col gap-2 items-center">
      <div
        {...getRootProps()}
        className={clsx(
          "bg-indigo-400 rounded-lg text-lg transition-colors flex flex-col gap-4 p-6 w-[700px] h-[200px]",
          isDragActive && "bg-indigo-600"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex gap-4">
          <IconFileUpload size={50} />
          <span className="font-bold">
            Upload an excalidraw file to get started
          </span>
        </div>
        <div className="flex gap-4">
          To get this file go to, Excalidraw Sidebar {">"} Save to disk{" "}
        </div>
      </div>
    </button>
  );
};

export default FileDrop;
