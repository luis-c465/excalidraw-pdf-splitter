import {
  IMAGE_WIDTH,
  canvasSplitsAtom,
  imageSplitOptionsAtom,
  resizedImageData as resizedImageDataAtom,
} from "@/lib/atoms";
import { drawImage, drawSelection } from "@/lib/canvas";
import type { Selection } from "@/lib/crop";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import CanvasWithContext, {
  CanvasContextGeneral,
  CanvasContextMouse,
} from "./CanvasWithContext";

export default function CanvasSketchSplitter() {
  return (
    <CanvasWithContext>
      <CanvasSelections />
      <DrawResizedImage />
    </CanvasWithContext>
  );
}

function DrawResizedImage() {
  const imageData = useAtomValue(resizedImageDataAtom);
  const imageSplitOption = useAtomValue(imageSplitOptionsAtom);
  const setImageSplits = useSetAtom(canvasSplitsAtom);
  const { ref } = useContext(CanvasContextGeneral);

  useEffect(() => {
    if (!imageData) return;

    drawImage(ref, imageData);
    setImageSplits([]);
  }, [imageData, imageSplitOption]);

  return null;
}

function CanvasSelections() {
  const imageSplit = useAtomValue(imageSplitOptionsAtom);

  if (imageSplit === "horizontally") return <HorizontalCanvasSelection />;
  else if (imageSplit === "vertically") return <VerticalCanvasSelection />;
  else if (imageSplit === "selection") return <BoxCanvasSelection />;
  else if (imageSplit === "entire sketch") return <EntireSketchSelection />;
  else return null;
}

function HorizontalCanvasSelection() {
  const imageData = useAtomValue(resizedImageDataAtom);
  const [canvasSplits, setCanvasSplits] = useAtom(canvasSplitsAtom);
  const { ref, ctx } = useContext(CanvasContextGeneral);
  const { mouseX, mouseY, clicked } = useContext(CanvasContextMouse);

  if (!imageData) return;

  useEffect(() => {
    drawImage(ref, imageData);

    for (let split of canvasSplits) {
      drawSelection(ctx, split);
    }

    ctx.beginPath();
    ctx.moveTo(0, mouseY);
    ctx.lineTo(IMAGE_WIDTH, mouseY);
    ctx.stroke();
  }, [mouseX, mouseY, imageData, canvasSplits]);

  useEffect(() => {
    if (!clicked) return;

    const lastSplitEndingY: number =
      canvasSplits.length !== 0
        ? canvasSplits[canvasSplits.length - 1][1][1]
        : 0;

    if (lastSplitEndingY >= mouseY) {
      toast("Cannot ");
      return;
    }
    setCanvasSplits((prev) => {
      const lastSplitEndingY: number =
        prev.length !== 0 ? prev[prev.length - 1][1][1] : 0;

      const newSplit: Selection = [
        [0, lastSplitEndingY],
        [ref.width, mouseY],
      ];

      const newSplits = [...prev, newSplit];
      return newSplits;
    });
  }, [clicked, mouseX, mouseY, ref]);

  return null;
}

function VerticalCanvasSelection() {
  const imageData = useAtomValue(resizedImageDataAtom);
  const [canvasSplits, setCanvasSplits] = useAtom(canvasSplitsAtom);
  const { ref, ctx } = useContext(CanvasContextGeneral);
  const { mouseX, mouseY, clicked } = useContext(CanvasContextMouse);

  if (!imageData) return;

  useEffect(() => {
    drawImage(ref, imageData);

    ctx.beginPath();
    ctx.moveTo(mouseX, 0);
    ctx.lineTo(mouseX, ref.height);
    ctx.stroke();
  }, [mouseX, mouseY, imageData]);

  useEffect(() => {
    if (!clicked) return;

    const lastSplitEndingY: number =
      canvasSplits.length !== 0
        ? canvasSplits[canvasSplits.length - 1][1][1]
        : 0;

    setCanvasSplits((prev) => {
      const lastSplitEndingY: number =
        prev.length !== 0 ? prev[prev.length - 1][1][1] : 0;

      const newSplit: Selection = [
        [0, lastSplitEndingY],
        [ref.width, mouseY],
      ];

      const newSplits = [...prev, newSplit];
      return newSplits;
    });
  }, [clicked, mouseX, mouseY, ref, canvasSplits]);

  return null;
}

function BoxCanvasSelection() {
  return null;
}

function EntireSketchSelection() {
  const setCanvasSplits = useSetAtom(canvasSplitsAtom);
  const { ref } = useContext(CanvasContextGeneral);
  useEffect(() => {
    setCanvasSplits([
      [
        [0, 0],
        [ref.width - 1, ref.height - 1],
      ],
    ]);
  }, []);

  return null;
}
