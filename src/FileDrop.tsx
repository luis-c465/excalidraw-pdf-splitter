import { exportToBlob, loadFromBlob } from "@excalidraw/excalidraw";
import { IconFileUpload } from "@tabler/icons-react";
import clsx from "clsx/lite";
import { useSetAtom } from "jotai";
import React, { useCallback, useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { fileAtom } from "./atoms";

const FileDrop: React.FC = () => {
  const setFileAtom = useSetAtom(fileAtom);

  const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
    async (acceptedFiles) => {
      if (acceptedFiles.length != 1) return;

      const [file] = acceptedFiles;
      setFileAtom(file);

      console.time("getting scene");
      const scene = await loadFromBlob(file, null, null);
      console.timeEnd("getting scene");
      console.time("getting image");
      const image = await exportToBlob({
        ...scene,
        exportPadding: 5,
        quality: 1,
      });
      console.timeEnd("getting image");
      console.log("done");
      const url = URL.createObjectURL(image);
      console.log(url);
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
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps()}
        className={clsx(
          "bg-blue-300 rounded-lg text-lg transition-colors flex flex-col gap-4 p-6 w-[400px]",
          isDragActive && "bg-blue-600"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex gap-4">
          <IconFileUpload size={50} />
          <span className="font-bold">Upload the excalidraw file here</span>
        </div>
        <div className="flex gap-4 text-sm">
          To get this file Sidebar {">"} Save to disk{" "}
        </div>
      </div>
    </div>
  );
};

export default FileDrop;
