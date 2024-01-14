import { useAtomValue } from "jotai";
import InteractiveSketchSplitter from "./InteractiveSketchSplitter";
import { splitBase64ImagesAtom } from "./atoms";

export default function SketchSplitter() {
  return (
    <div className="flex gap-2">
      <InteractiveSketchSplitter />
      <SplitSketches />
    </div>
  );
}

function SplitSketches() {
  const splitBase64Images = useAtomValue(splitBase64ImagesAtom);

  return (
    <div className="flex gap-2 flex-wrap">
      {splitBase64Images.map(ImagePreview)}
    </div>
  );
}

function ImagePreview(src: string) {
  return <img src={src} alt="Split image" className="rounded-lg" />;
}
