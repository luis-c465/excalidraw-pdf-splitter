import { exportToCanvas, loadFromBlob } from "@excalidraw/excalidraw";
import { Image } from "image-js";
import { memoize } from "lodash-es";

export type Selection = [[number, number], [number, number]];
export const cropImage = memoize(
  (selection: Selection, image: Image, resizedFactor: number) => {
    const x = selection[0][0] * resizedFactor;
    const y = selection[0][1] * resizedFactor;
    const width = (selection[1][0] - selection[0][0]) * resizedFactor;
    const height = (selection[1][1] - selection[0][1]) * resizedFactor;

    return image.crop({
      x,
      y,
      width,
      height,
    });
  }
);

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result! as string);
    reader.readAsDataURL(blob);
  });
}

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param srcWidth width of source image
 * @param srcHeight height of source image
 * @param maxWidth maximum available width
 * @param maxHeight maximum available height
 */
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
) {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

/**
 * Converts an excalidraw file to an Image.js object
 */
export async function excalidrawFileToImage(file: Blob) {
  const scene = await loadFromBlob(file, null, null);
  const canvas = await exportToCanvas({
    ...scene,
    exportPadding: 5,
  });

  return Image.fromCanvas(canvas);
}
