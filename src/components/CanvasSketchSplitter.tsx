import {
  IMAGE_WIDTH,
  canvasSplitsAtom,
  imageSplitOptionsAtom,
  resizedImageData as resizedImageDataAtom,
} from "@/lib/atoms";
import { drawImage } from "@/lib/canvas";
import type { Selection } from "@/lib/image";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useContext, useEffect } from "react";
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
  const [imageData] = useAtom(resizedImageDataAtom);
  const { ref } = useContext(CanvasContextGeneral);

  useEffect(() => {
    if (!imageData) return;

    drawImage(ref, imageData);
  }, [imageData]);

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
