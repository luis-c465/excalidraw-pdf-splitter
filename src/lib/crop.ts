import { Image } from "image-js";
import { memoize } from "lodash-es";
export type Selection = [Coordinate, Coordinate];
export type Coordinate = [number, number];

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
