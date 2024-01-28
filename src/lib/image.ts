import Image from "image-js";

export const IMAGE_SMALLEST_DIM = 800;
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result! as string);
    reader.readAsDataURL(blob);
  });
}

/**
 * Returns an array of an image that is "scaled to size" and the resized factor
 *
 * Meaning the minimum length of the image will be of `IMAGE_SMALLEST_DIM`
 */
export function scaleSourceImageToSize(img: Image) {
  // As a note, the resize operation is not done in place
  // the image is first cloned
  // @see https://github.com/image-js/image-js/blob/9ab86a86f6c13a9a7d14c62566c1396c3c6f54f4/src/image/transform/resize/resize.js#L49

  if (img.width >= img.height) {
    const resized = img.resize({
      height: IMAGE_SMALLEST_DIM,
      preserveAspectRatio: true,
    });
    console.log(resized.width, resized.height);
    const resizedRatio = img.width / resized.width;
    return [resized, resizedRatio] as const;
  } else {
    const resized = img.resize({
      width: IMAGE_SMALLEST_DIM,
      preserveAspectRatio: true,
    });
    const resizedRatio = img.height / resized.height;
    return [resized, resizedRatio] as const;
  }
}
