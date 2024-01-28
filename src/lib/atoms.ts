import { Image } from "image-js";
import { atom } from "jotai";
import { cropImage, type Selection } from "./crop";
import { scaleSourceImageToSize } from "./image";

export const fileAtom = atom<File | null>(null);
export const sourceImageAtom = atom<Image | null>(null);

export const resizedImageAtom = atom<readonly [Image | null, number | null]>(
  (get) => {
    const sourceImage = get(sourceImageAtom);
    if (!sourceImage) return [null, -1];

    return scaleSourceImageToSize(sourceImage);
  }
);
export const resizedImageLoadedAtom = atom((get) => {
  const [resizedImage] = get(resizedImageAtom);
  console.log("image", resizedImage, !!resizedImage);
  return !!resizedImage;
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
