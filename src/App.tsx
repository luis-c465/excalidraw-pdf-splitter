import { resizedImageAtom, sourceImageAtom } from "@/atoms";
import CanvasSketchSplitter from "@/components/CanvasSketchSplitter";
import FileDrop from "@/components/FileDrop";
import FileLoader from "@/components/FileLoader";
import { exportToCanvas, loadFromBlob } from "@excalidraw/excalidraw";
import { Image } from "image-js";
import { useAtomValue, useSetAtom } from "jotai";
import SplitterOptions from "./components/SplitterOptions";
import { useAsyncEffect } from "./hooks";

export default function App() {
  const setSourceImage = useSetAtom(sourceImageAtom);

  // Load the Amogus
  useAsyncEffect(async () => {
    const req = await fetch("pain.excalidraw");
    const file = await req.blob();
    const scene = await loadFromBlob(file, null, null);
    const canvas = await exportToCanvas({
      ...scene,
      exportPadding: 5,
    });
    const image = Image.fromCanvas(canvas);
    setSourceImage(image);

    return null;
  });

  return (
    <main className="flex flex-col gap-3 items-center">
      <header>
        <h1>Excalidraw to PDF tool</h1>
      </header>

      <div className="flex flex-col gap-2">
        <FileUploader />

        <SketchSplitter />
      </div>
    </main>
  );
}

function FileUploader() {
  const [resizedImage] = useAtomValue(resizedImageAtom);
  if (resizedImage) return null;

  return (
    <>
      <FileDrop />
      <FileLoader />
    </>
  );
}

function SketchSplitter() {
  const [resizedImage] = useAtomValue(resizedImageAtom);

  if (!resizedImage) return;

  return (
    <div className="flex gap-2 flex-col items-center">
      <h1 className="text-center font-bold text-xl">
        The drawing has been loaded, split the image into separate parts
      </h1>
      <SplitterOptions />

      <div className="flex gap-2 items-center">
        <CanvasSketchSplitter />
        {/* <SplitSketches /> */}
      </div>
    </div>
  );
}