import CanvasSketchSplitter from "@/components/CanvasSketchSplitter";
import { resizedImageAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { DynamicExportToPDF } from "./components/ExportToPDF";
import HomeScreen from "./components/HomeScreen";
import SplitSketches from "./components/SplitSketches";
import SplitterOptions from "./components/SplitterOptions";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <main className="flex flex-col gap-3 items-center">
        <Header />

        <HomeScreen />

        <div className="flex flex-col gap-2">
          <SketchSplitter />
        </div>
      </main>
      <Toaster />
    </>
  );
}

function Header() {
  return (
    <header className="flex flex-row gap-5 items-center">
      <h1>Excalidraw to PDF tool</h1>

      <DynamicExportToPDF />
    </header>
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
