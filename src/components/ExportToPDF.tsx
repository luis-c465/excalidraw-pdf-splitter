import { splitImagesAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { PDFViewer } from "./PdfViewer";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function DynamicExportToPDF() {
  const splitImages = useAtomValue(splitImagesAtom);

  if (splitImages.length === 0) return null;
  else return <ExportToPDF />;
}

export function ExportToPDF() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Export PDF</Button>
      </DialogTrigger>
      <PDFDialogContent />
    </Dialog>
  );
}

export function PDFDialogContent() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Generate PDF</DialogTitle>
        <DialogDescription>Export split images as a pdf</DialogDescription>
      </DialogHeader>

      <div className="flex justify-center w-full">
        <PDFViewer />
      </div>
    </DialogContent>
  );
}
