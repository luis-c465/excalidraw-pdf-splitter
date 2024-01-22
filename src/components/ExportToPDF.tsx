import { splitImagesAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { PDFViewer } from "./PdfViewer";
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
      <DialogTrigger>Generate PDF</DialogTrigger>
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

      <div className="flex flex-row gap-2">
        <div>options</div>
        <PDFViewer />
      </div>
    </DialogContent>
  );
}
