import { useAtomValue } from "jotai";
import { DynamicExportToPDF } from "./components/ExportToPDF";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import SketchSplitter from "./components/SketchSplitter";
import { Toaster } from "./components/ui/sonner";
import { resizedImageAtom } from "./lib/atoms";

export default function App() {
  return (
    <>
      <main className="flex flex-col gap-3 items-center">
        <HomeScreen />

        <DynamicSmallHeader />
        <div className="flex flex-col gap-2">
          <SketchSplitter />
        </div>
      </main>
      <Toaster />
    </>
  );
}
function DynamicSmallHeader() {
  const [resizedImage] = useAtomValue(resizedImageAtom);

  if (!resizedImage) return null;

  return (
    <Header big={false}>
      <DynamicExportToPDF />
    </Header>
  );
}
