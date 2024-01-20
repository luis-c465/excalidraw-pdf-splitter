import p5 from "p5";

/**
 * Select file(s).
 * @param {String} contentType The content type of files you wish to select. For instance, use "image/*" to select all types of images.
 * @param {Boolean} multiple Indicates if the user can select multiple files.
 * @returns {Promise<File|File[]>} A promise of a file or array of files in case the multiple parameter is true.
 */
export function selectFile(contentType: string): Promise<File>;
export function selectFile(
  contentType: string,
  multiple: true
): Promise<File[]>;
export function selectFile(
  contentType: string,
  multiple = false
): Promise<File | File[]> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple;
    input.accept = contentType;

    input.onchange = () => {
      const files = Array.from(input.files!);
      if (multiple) resolve(files);
      else resolve(files[0]);
    };

    input.click();
  });
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result! as string);
    reader.readAsDataURL(blob);
  });
}

export async function getImageDimensions(src: string): Promise<number[]> {
  return new Promise(function (resolve) {
    if (!src) {
      resolve([-1 - 1]);
      return;
    }

    const i = new Image();
    i.onload = function () {
      resolve([i.naturalWidth, i.naturalHeight]);
    };
    i.style.display = "none";
    i.src = src;
  });
}

export function p5ImageToBase64(img: p5.Image) {
  // @ts-expect-error P5.js does not document this feature
  // images do have an internal canvas
  // @see https://github.com/processing/p5.js/issues/2326#issuecomment-340965418
  return img.canvas.toDataUrl();
}

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}
