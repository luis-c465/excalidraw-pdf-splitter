import { resizedImageAtom } from "@/atoms";
import CanvasSketchSplitter from "@/components/CanvasSketchSplitter";
import FileDrop from "@/components/FileDrop";
import FileLoader from "@/components/FileLoader";
import { useAtomValue } from "jotai";

export default function App() {
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
    <div className="flex gap-2 flex-col">
      <h1 className="text-center font-bold text-xl">
        The drawing has been loaded, split the image into separate parts
      </h1>

      <div className="flex gap-2 items-center">
        <CanvasSketchSplitter />
        {/* <SplitSketches /> */}
      </div>
    </div>
  );
}
