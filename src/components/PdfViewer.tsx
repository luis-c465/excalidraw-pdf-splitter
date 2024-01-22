import { splitImagesAtom } from "@/atoms";
import { calculateAspectRatioFit } from "@/util";
import { useAtomValue } from "jotai";
import { RGBAData, jsPDF } from "jspdf";
import { useMemo } from "react";
import { PDFEmbed } from "./PDFEmbed";

export const MAX_IMG_WIDTH = 200;
export const MAX_IMG_HEIGHT = 280;

export function PDFViewer() {
  const splitImages = useAtomValue(splitImagesAtom);

  const doc = useMemo(() => {
    const doc = new jsPDF();

    splitImages.forEach((img, i) => {
      // On the first iteration do not add a page
      // because the PDF starts out with one page already
      if (i != 0) doc.addPage();

      const RGBData: RGBAData = {
        data: img.getRGBAData({ clamped: true }) as Uint8ClampedArray,
        width: img.width,
        height: img.height,
      };
      const { width, height } = calculateAspectRatioFit(
        img.width,
        img.height,
        MAX_IMG_WIDTH,
        MAX_IMG_HEIGHT
      );

      doc.addImage(
        RGBData,
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

    // doc.output("dataurlnewwindow");
    return doc;
  }, [splitImages]);
  const dataURI = doc.output("datauristring");

  return <PDFEmbed src={dataURI} />;
}
