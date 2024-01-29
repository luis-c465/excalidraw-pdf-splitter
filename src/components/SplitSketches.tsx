import { Button } from "@/components/ui/button";
import { canvasSplitsAtom, splitImagesBlobUrlsAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { IconTrash } from "@tabler/icons-react";
import { useAtomValue, useSetAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import type { Atom } from "jotai/vanilla";
import { Suspense, useCallback } from "react";
import { Skeleton } from "./ui/skeleton";

const splitImagesSplitAtom = splitAtom(splitImagesBlobUrlsAtom);
export default function SplitSketches() {
  const splitImages = useAtomValue(splitImagesSplitAtom);

  return (
    <div
      className={cn(
        "flex gap-2 overflow-scroll basis-6/12 flex-row flex-wrap w-full h-[90%]"
      )}
    >
      {splitImages.map((img, i) => (
        <Suspense fallback={<Skeleton className="w-full h-[200px]" />} key={i}>
          <ImagePreview atom={img} index={i} />
        </Suspense>
      ))}
    </div>
  );
}

type ImagePreviewProps = {
  atom: Atom<Promise<string>>;
  index: number;
};
function ImagePreview({ atom, index }: ImagePreviewProps) {
  const src = useAtomValue(atom);
  const setSplits = useSetAtom(canvasSplitsAtom);

  const deleteSplit = useCallback(
    () => setSplits((splits) => splits.toSpliced(index, 1)),
    [index]
  );

  return (
    <div className="relative">
      <img src={src} alt="Split image" className="rounded-lg" />

      <DeleteSplitButton onClick={deleteSplit} index={index} />
    </div>
  );
}

type DeleteSplitButtonProps = {
  onClick: () => void;
  index: number;
};
function DeleteSplitButton({ onClick, index }: DeleteSplitButtonProps) {
  return (
    <Button
      className="absolute top-4 right-8 opacity-80 hover:opacity-20 transition-opacity"
      variant="destructive"
      size="sm"
      onClick={onClick}
    >
      <IconTrash />#{index + 1}
    </Button>
  );
}
