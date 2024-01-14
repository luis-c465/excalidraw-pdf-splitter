import { atom } from "jotai";
import type p5 from "p5";
import { getImageDimensions } from "./util";

export const fileAtom = atom<File | null>(null);
export const imgAtom = atom<string | null>(null);
export const splitImagesAtom = atom<p5.Image[]>([]);
export const splitBase64ImagesAtom = atom<string[]>((get) => {
  const images = get(splitImagesAtom);

  return images;
});

export const p5WindowDimsAtom = atom(async (get) => {
  const url = get(imgAtom)!;
  let [width, height] = await getImageDimensions(url);
  const aspectRatio = width / height;
  // width
  const resizeTo = 800;

  if (height >= width) {
    width = resizeTo;
    height = width / aspectRatio;
  }

  return [width, height];
});
