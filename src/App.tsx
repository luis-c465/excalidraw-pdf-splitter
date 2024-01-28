import { useAtomValue } from "jotai";
import ConvertAgainBtn from "./components/ConvertAgainBtn";
import { DynamicExportToPDF } from "./components/ExportToPDF";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import SketchSplitter from "./components/SketchSplitter";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/ui/theme-provider";
import { resizedImageLoadedAtom } from "./lib/atoms";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Main />
      <Toaster />
    </ThemeProvider>
  );
}

/**
 * The main component to be rendered in the App
 */
function Main() {
  return (
    <main className="flex flex-col gap-3 items-center w-screen h-screen overflow-clip">
      <HomeScreen />

      <DynamicSmallHeader />
      <SketchSplitter />

      <Footer />
    </main>
  );
}

function DynamicSmallHeader() {
  const resizedImageLoaded = useAtomValue(resizedImageLoadedAtom);
  if (!resizedImageLoaded) return null;

  return (
    <Header big={false}>
      <DynamicExportToPDF />
      <ConvertAgainBtn />
    </Header>
  );
}
