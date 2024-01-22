import { exportToCanvas, loadFromBlob } from "@excalidraw/excalidraw";
import { IconCheck } from "@tabler/icons-react";
import { Image } from "image-js";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import { Bars, MutatingDots } from "react-loader-spinner";
import { fileAtom, sourceImageAtom } from "../lib/atoms";
import { useAsyncEffect } from "../lib/hooks";

type Status = "none" | "loading" | "done";

export default function FileLoader() {
  const file = useAtomValue(fileAtom);
  const setSourceImage = useSetAtom(sourceImageAtom);

  const [totalStatus, setTotalStatus] = useState<Status>("none");
  const [sceneStatus, setSceneStatus] = useState<Status>("none");
  const [imgStatus, setImgStatus] = useState<Status>("none");

  useAsyncEffect(async () => {
    if (!file) return;

    setTotalStatus("loading");
    setSceneStatus("loading");
    const scene = await loadFromBlob(file, null, null);
    setSceneStatus("done");

    setImgStatus("loading");
    const canvas = await exportToCanvas({
      ...scene,
      exportPadding: 5,
    });
    const image = Image.fromCanvas(canvas);
    setSourceImage(image);

    setImgStatus("done");

    setTotalStatus("done");
  }, [file]);

  if (totalStatus === "none") return;
  return (
    <div className="flex flex-col gap-4">
      {sceneStatus !== "none" && <MakingScene status={sceneStatus} />}

      {imgStatus !== "none" && <ConvertingToImg status={imgStatus} />}
    </div>
  );
}

type LoaderProps = {
  status: Status;
};

export function BaseLoader({
  children,
  status,
  text,
}: { children: React.ReactNode; text: string } & LoaderProps) {
  if (status === "none") return;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {status === "loading" ? children : <IconCheck size={100} />}

        <span>{text}</span>
      </div>
    </div>
  );
}

function MakingScene({ status }: LoaderProps) {
  return (
    <BaseLoader status={status} text={"Making Scene"}>
      <MutatingDots
        visible
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="Making Scene loading spinner"
      />
    </BaseLoader>
  );
}

function ConvertingToImg({ status }: LoaderProps) {
  return (
    <BaseLoader status={status} text={"Converting to img"}>
      <Bars
        visible
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="Converting scene to image loading spinner"
      />
    </BaseLoader>
  );
}
