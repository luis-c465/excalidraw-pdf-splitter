import { resizedImageAtom } from "@/lib/atoms";
import { IconArrowRight } from "@tabler/icons-react";
import { useAtomValue } from "jotai/react";
import ExcalidrawDemo from "./ExcalidrawDemo";
import FileDrop from "./FileDrop";
import FileLoader from "./FileLoader";
import PDFDemo from "./PDFDemo";
import logo from "/logo.png?url";

export default function HomeScreen() {
  const [resizedImage] = useAtomValue(resizedImageAtom);
  if (resizedImage) return null;

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
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <img className="text-9xl h-[1em]" src={logo} />
        <h1 className="inline-block bg-gradient-to-r from-indigo-400 to-red-400 bg-clip-text text-9xl text-transparent">
          ExcaliDraw to PDF
        </h1>
      </div>

      <span className="text-muted-foreground text-xl">
        Converts sections of an excalidraw file to a PDF
      </span>
    </div>
  );
}

function Demo() {
  return (
    <div className="flex gap-3 items-center">
      <ExcalidrawDemo />
      <IconArrowRight size={50} />
      <PDFDemo />
    </div>
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
