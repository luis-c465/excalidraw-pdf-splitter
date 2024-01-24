import CanvasSketchSplitter from "@/components/CanvasSketchSplitter";
import FileDrop from "@/components/FileDrop";
import FileLoader from "@/components/FileLoader";
import { resizedImageAtom, sourceImageAtom } from "@/lib/atoms";
import { excalidrawFileToImage } from "@/lib/excalidraw";
import { useAtomValue, useSetAtom } from "jotai";
import { DynamicExportToPDF } from "./components/ExportToPDF";
import SplitSketches from "./components/SplitSketches";
import SplitterOptions from "./components/SplitterOptions";
import { Toaster } from "./components/ui/sonner";
import { useAsyncEffect } from "./lib/hooks";

export default function App() {
  const setSourceImage = useSetAtom(sourceImageAtom);

  // Load the Amogus
  useAsyncEffect(async () => {
    const req = await fetch("pain.excalidraw");
    const file = await req.blob();
    const image = await excalidrawFileToImage(file);
    setSourceImage(image);

    return null;
  });

  return (
    <>
      <main className="flex flex-col gap-3 items-center">
        <header className="flex flex-row gap-5 items-center">
          <h1>Excalidraw to PDF tool</h1>

          <DynamicExportToPDF />
        </header>

        <div className="flex flex-col gap-2">
          <FileUploader />

          <SketchSplitter />
        </div>
      </main>
      <Toaster />
    </>
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

      <div className="flex flex-row gap-2 justify-center items-start">
        <CanvasSketchSplitter />
        <SplitSketches />
      </div>
    </div>
  );
}
