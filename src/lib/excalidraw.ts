import { exportToCanvas, loadFromBlob } from "@excalidraw/excalidraw";
import { Image } from "image-js";

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
