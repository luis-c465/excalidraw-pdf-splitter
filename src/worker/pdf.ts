import { calculateAspectRatioFit } from "@/lib/image";
import { RGBAData, jsPDF } from "jspdf";

export const MAX_IMG_WIDTH = 200;
export const MAX_IMG_HEIGHT = 280;

export type Arg = RGBAData[];
export type Returns = string;

self.addEventListener("message", (e: MessageEvent<Arg>) => {
  const result: Returns = createPDF(e.data);
  self.postMessage(result);
});

function createPDF(imagesData: Arg) {
  const doc = new jsPDF();

  imagesData.forEach((imgData, i) => {
    // On the first iteration do not add a page
    // because the PDF starts out with one page already
    if (i != 0) doc.addPage();

    const { width, height } = calculateAspectRatioFit(
      imgData.width,
      imgData.height,
      MAX_IMG_WIDTH,
      MAX_IMG_HEIGHT
    );

    doc.addImage(
      imgData,
      "JPEG",
      15,
      40,
      width,
      height,
      undefined,
      "NONE",
      undefined
    );
  });

  return doc.output("datauristring");
}