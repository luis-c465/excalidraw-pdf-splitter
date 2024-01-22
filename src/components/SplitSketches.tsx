import { splitImagesBlobUrlsAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { splitAtom } from "jotai/utils";
import type { Atom } from "jotai/vanilla";
import { Suspense } from "react";

const splitImagesSplitAtom = splitAtom(splitImagesBlobUrlsAtom);
export default function SplitSketches() {
  const splitImages = useAtomValue(splitImagesSplitAtom);

  return (
    <div className="flex gap-2 flex-wrap">
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
