import { Image } from "image-js";
import { atom } from "jotai";
import type { Selection } from "./components/CanvasSketchSplitter";
import { cropImage } from "./image";

export const IMAGE_WIDTH = 800;

export const fileAtom = atom<File | null>(null);
export const sourceImageAtom = atom<Image | null>(null);

export const resizedImageAtom = atom<[Image | null, number | null]>((get) => {
  const sourceImage = get(sourceImageAtom);
  if (!sourceImage) return [null, -1];

  // The resize operation is not done in place
  // the image is first cloned
  // @see https://github.com/image-js/image-js/blob/9ab86a86f6c13a9a7d14c62566c1396c3c6f54f4/src/image/transform/resize/resize.js#L49
  const resizedImage = sourceImage.resize({
    width: IMAGE_WIDTH,
    preserveAspectRatio: true,
  });

  const resizedFactor = sourceImage.width / resizedImage.width;
  return [resizedImage, resizedFactor];
});

export const resizedImageData = atom<ImageData | null>((get) => {
  const [resized] = get(resizedImageAtom);
  if (!resized) return null;

  return new ImageData(
    resized.getRGBAData({ clamped: true }) as any,
    resized.width,
    resized.height
  );
});

export const imageSplitOptions = [
  "horizontally",
  "vertically",
  "selection",
  "entire sketch",
] as const;
export type ImageSplitOption = (typeof imageSplitOptions)[number];
export const imageSplitOptionsAtom = atom<ImageSplitOption>("horizontally");
export const canvasSplitsAtom = atom<Selection[]>([]);

export const splitImagesAtom = atom<Image[]>((get) => {
  const sourceImage = get(sourceImageAtom);
  const canvasSplits = get(canvasSplitsAtom);
  const [_, resizedFactor] = get(resizedImageAtom);

  if (!sourceImage || !canvasSplits || !resizedFactor) return [];

  return canvasSplits.map((selection) =>
    cropImage(selection, sourceImage, resizedFactor)
  );
});

export const splitImagesBlobUrlsAtom = atom((get) => {
  const splitImages = get(splitImagesAtom);

  return splitImages.map(async (img) => {
    const blob = await img.toBlob();
    const url = URL.createObjectURL(blob);
    return url;
  });
});
