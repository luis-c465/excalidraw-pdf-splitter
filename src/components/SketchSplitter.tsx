import { resizedImageAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import CanvasSketchSplitter from "./CanvasSketchSplitter";
import SplitSketches from "./SplitSketches";
import SplitterOptions from "./SplitterOptions";

export default function SketchSplitter() {
  const [resizedImage] = useAtomValue(resizedImageAtom);

  if (!resizedImage) return;

  return (
    <div className="flex gap-2 flex-col items-center">
      <h1 className="text-center font-bold text-xl">
        The drawing has been loaded, split the image into separate parts
      </h1>
      <SplitterOptions />

      <div className="flex flex-row gap-2 justify-center items-start">
        <CanvasSketchSplitter />
        <SplitSketches />
      </div>
    </div>
  );
}
