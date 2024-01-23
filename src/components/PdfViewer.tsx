import { splitImagesAtom } from "@/lib/atoms";
import { useAsyncEffect } from "@/lib/hooks";
import { workerToPromise } from "@/lib/worker";
import type { Arg, Returns } from "@/worker/pdf";
import PDFWorker from "@/worker/pdf?worker";
import { useAtomValue } from "jotai";
import PDFEmbed, { PDFEmbedSkeleton } from "./PDFEmbed";

export function PDFViewer() {
  const splitImages = useAtomValue(splitImagesAtom);

  const { result, isLoading } = useAsyncEffect(async () => {
    const RGBData = splitImages.map((img) => ({
      data: img.getRGBAData({ clamped: true }) as Uint8ClampedArray,
      width: img.width,
      height: img.height,
    }));
    return await workerToPromise<Arg, Returns>(PDFWorker)(RGBData);
  }, [splitImages]);

  if (isLoading || !result) return <PDFEmbedSkeleton />;

  return <PDFEmbed src={result} />;
}
