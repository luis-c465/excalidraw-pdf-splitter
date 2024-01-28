import { resizedImageLoadedAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai/react";
import Demo from "./Demo";
import FileUploader from "./FileUploader";
import Header from "./Header";

export default function HomeScreen() {
  const resizedImageLoaded = useAtomValue(resizedImageLoadedAtom);
  if (resizedImageLoaded) return null;

  return (
    <div className="flex flex-col gap-5">
      <TitleBlock />
      <FileUploader />

      <Demo />
    </div>
  );
}

function TitleBlock() {
  return (
    <div
      className="flex flex-col gap-5 bg-slate-700 shadow-[0_0_360px_230px_theme(colors.slate.700)]"
      style={{
        boxShadow: "0 0 360px 230px red !important",
      }}
    >
      <Header />

      <span className="text-muted-foreground text-slate-400 text-2xl">
        Converts sections of an excalidraw file to a PDF
      </span>
    </div>
  );
}
