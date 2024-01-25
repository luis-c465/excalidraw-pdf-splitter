import { IconArrowRight } from "@tabler/icons-react";
import ExcalidrawDemo from "./ExcalidrawDemo";
import PDFDemo from "./PDFDemo";

export default function Demo() {
  return (
    <div className="flex gap-3 items-center">
      <ExcalidrawDemo />
      <IconArrowRight size={50} color="white" />
      <PDFDemo />
    </div>
  );
}
