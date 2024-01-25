import { useAtomValue } from "jotai";
import ConvertAgainBtn from "./components/ConvertAgainBtn";
import { DynamicExportToPDF } from "./components/ExportToPDF";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import SketchSplitter from "./components/SketchSplitter";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/ui/theme-provider";
import { resizedImageAtom } from "./lib/atoms";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <main className="flex flex-col gap-3 items-center w-full">
        <HomeScreen />

        <DynamicSmallHeader />
        <div className="flex flex-col gap-2 w-full items-start">
          <SketchSplitter />
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}
function DynamicSmallHeader() {
  const [resizedImage] = useAtomValue(resizedImageAtom);

  if (!resizedImage) return null;

  return (
    <Header big={false}>
      <DynamicExportToPDF />
      <ConvertAgainBtn />
    </Header>
  );
}
