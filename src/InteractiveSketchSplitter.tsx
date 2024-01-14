import { useAtomValue, useSetAtom } from "jotai";
import type p5 from "p5";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { imgAtom, p5WindowDimsAtom, splitImagesAtom } from "./atoms";

export default function InteractiveSketchSplitter() {
  const image = useAtomValue(imgAtom);
  const setSplitImages = useSetAtom(splitImagesAtom);
  const p5WindowDims = useAtomValue(p5WindowDimsAtom);

  console.log("pain", typeof image, p5WindowDims);
  if (!image) return;
  console.log("outside", typeof image);

  return (
    <div className="w-[800px] h-fit">
      <ReactP5Wrapper
        sketch={sketch}
        image={image}
        setSplitImages={setSplitImages}
        p5WindowDims={p5WindowDims}
      />
    </div>
  );
}

type SketchProps = {
  image: string;
  setSplitImages: (image: p5.Image[]) => void;
  p5WindowDims: [number, number];
};

function sketch(p: p5) {
  const splices: number[] = [];
  let sourceImage: p5.Image;
  let sourceBlob: string;
  const lineSize = 2;
  let setImages: SketchProps["setSplitImages"];
  let hasLoaded = false;
  let w: number;
  let h: number;

  // @ts-expect-error Trust me bro, in this lib this works perfectly fine
  p.updateWithProps = ({
    image,
    setSplitImages,
    p5WindowDims: [width, height],
  }: SketchProps) => {
    sourceBlob = image;
    setImages = setSplitImages;
    w = width;
    h = height;
    console.log(w, h);

    console.log("Updating props");

    p.setup();
  };

  p.setup = () => {
    console.log("inside", sourceBlob);
    if (!sourceBlob) return;

    sourceImage = p.loadImage(sourceBlob, (img) => {
      img.resize(800, 0);
      img.loadPixels();
      console.log(img.width, img.height);

      // p.image(img, 0, 0);
    });

    // settings
    p.strokeWeight(lineSize);

    p.createCanvas(w, h);

    p.loadPixels();
  };

  function onAddLine() {
    const y = splices[splices.length - 1];
    p.line(0, y, p.width, y);

    console.log("splices", splices);
  }

  function undoLine() {
    if (splices.length === 0) return;

    p.loadPixels();
    sourceImage.loadPixels();
    const last = splices.pop()!;
    // set(255, last-5, 0)

    const d = p.pixelDensity();

    for (let i = 0; i < d; i += 1) {
      for (let j = 0; j < d; j += 1) {
        for (let x = 0; x < p.width; x++) {
          for (let y = last - lineSize; y < last + lineSize; y++) {
            let index = 4 * ((y * d + j) * p.width * d + (x * d + i));
            for (let o = 0; o < 4; o++) {
              // Red.
              p.pixels[index + o] = sourceImage.pixels[index + o];
            }
          }
        }
      }
    }

    p.updatePixels();
  }
  p.mouseMoved = () => {
    if (!hasLoaded) {
      hasLoaded = true;
      p.image(sourceImage, 0, 0);
    }
  };

  p.mousePressed = () => {
    splices.push(p.mouseY);
    console.log("pressed");

    onAddLine();
  };

  p.keyPressed = () => {
    if (p.key === "u") {
      undoLine();
    } else if (p.key === "s") {
      saveImgs();
    } else {
      p.image(sourceImage, 0, 0);
    }
  };

  function saveImgs() {
    let imgs = [];

    let last = 0;
    const splicesCopy = [...splices].sort(compareNumbers);
    console.log(splicesCopy);
    for (let next of splicesCopy) {
      imgs.push(slice(last, next));
      last = next;
    }

    imgs.push(slice(last, p.height));
    setImages(imgs);

    for (let i = 0; i < imgs.length; i++) {
      imgs[i].save(`${i}`, "png");
    }
  }

  function slice(t: number, b: number) {
    let slice = p.createImage(p.width, b - t);
    console.log(t, b, b - t);

    slice.loadPixels();
    const d = p.pixelDensity();
    for (let i = 0; i < d; i += 1) {
      for (let j = 0; j < d; j += 1) {
        for (let x = 0; x < p.width; x++) {
          for (let y = t; y < b; y++) {
            let sliceIndex = 4 * ((y - t * d + j) * p.width * d + (x * d + i));
            let originalIndex = 4 * ((y * d + j) * p.width * d + (x * d + i));
            for (let o = 0; o < 4; o++) {
              // Red.
              slice.pixels[sliceIndex + o] =
                sourceImage.pixels[originalIndex + o];
            }
          }
        }
      }
    }

    slice.updatePixels();
    return slice;
  }

  function compareNumbers(a: number, b: number) {
    return a - b;
  }
}
