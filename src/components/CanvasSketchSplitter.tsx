import {
  IMAGE_WIDTH,
  canvasSplitsAtom,
  imageSplitOptionsAtom,
  resizedImageData as resizedImageDataAtom,
} from "@/atoms";
import { drawImage } from "@/canvas";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useContext, useEffect } from "react";
import CanvasWithContext, {
  CanvasContextGeneral,
  CanvasContextMouse,
} from "./CanvasWithContext";

export type Selection = [[number, number], [number, number]];
export default function CanvasSketchSplitter() {
  return (
    <CanvasWithContext>
      <CanvasSelections />
      <DrawResizedImage />
    </CanvasWithContext>
  );
}

function DrawResizedImage() {
  const [imageData] = useAtom(resizedImageDataAtom);
  const { ref } = useContext(CanvasContextGeneral);

  useEffect(() => {
    if (!imageData) return;

    drawImage(ref, imageData);
    console.log("bruh");
  }, [imageData]);

  return null;
}

function CanvasSelections() {
  const imageSplit = useAtomValue(imageSplitOptionsAtom);

  if (imageSplit === "horizontally") return <HorizontalCanvasSelection />;
  else if (imageSplit === "vertically") return <VerticalCanvasSelection />;
  else if (imageSplit === "selection") return <BoxCanvasSelection />;
  else return null;
}

function HorizontalCanvasSelection() {
  const imageData = useAtomValue(resizedImageDataAtom);
  const setCanvasSplits = useSetAtom(canvasSplitsAtom);
  const { ref, ctx } = useContext(CanvasContextGeneral);
  const { mouseX, mouseY, clicked } = useContext(CanvasContextMouse);

  if (!imageData) return;

  useEffect(() => {
    drawImage(ref, imageData);

    ctx.beginPath();
    ctx.moveTo(0, mouseY);
    ctx.lineTo(IMAGE_WIDTH, mouseY);
    ctx.stroke();
  }, [mouseX, mouseY, imageData]);

  useEffect(() => {
    if (!clicked) return;

    setCanvasSplits((prev) => {
      const lastSplitEndingY: number =
        prev.length !== 0 ? prev[prev.length - 1][1][1] : 0;

      const newSplit: Selection = [
        [0, lastSplitEndingY],
        [ref.width, mouseY],
      ];

      const newSplits = [...prev, newSplit];
      console.log("set splits", newSplits);
      return newSplits;
    });
  }, [clicked, mouseX, mouseY, ref]);

  return null;
}

function VerticalCanvasSelection() {
  return null;
}

function BoxCanvasSelection() {
  return null;
}
