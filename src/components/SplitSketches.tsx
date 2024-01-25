import { imageSplitOptionsAtom, splitImagesBlobUrlsAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { splitAtom } from "jotai/utils";
import type { Atom } from "jotai/vanilla";
import { Suspense } from "react";

const splitImagesSplitAtom = splitAtom(splitImagesBlobUrlsAtom);
export default function SplitSketches() {
  const splitImages = useAtomValue(splitImagesSplitAtom);
  const imageSplitOption = useAtomValue(imageSplitOptionsAtom);

  return (
    <div
      className={cn(
        "flex gap-2 overflow-scroll basis-6/12",
        imageSplitOption === "vertically" && "flex-row",
        imageSplitOption === "selection" && "flex-row flex-wrap",
        imageSplitOption === "horizontally" && "flex-col flex-wrap"
      )}
    >
      {splitImages.map((img, i) => (
        <Suspense fallback="Loading..." key={i}>
          <ImagePreview atom={img} />
        </Suspense>
      ))}
    </div>
  );
}

function ImagePreview({ atom }: { atom: Atom<Promise<string>> }) {
  const src = useAtomValue(atom);

  return <img src={src} alt="Split image" className="rounded-lg" />;
}
