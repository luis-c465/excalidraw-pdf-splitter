import {
  canvasSplitsAtom,
  imageSplitOptionsAtom,
  resizedImageData as resizedImageDataAtom,
} from "@/lib/atoms";
import { drawAllSelections, drawImage } from "@/lib/canvas";
import { Coordinate, type Selection } from "@/lib/crop";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useContext, useEffect, useState } from "react";
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

/**
 * Draws the resized image to the screen and resets the splits
 * when the image data or selected split option changes
 */
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

/**
 * Draws and handles the user input for selecting portions of the canvas
 */
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
    drawAllSelections(ctx, canvasSplits);

    ctx.beginPath();
    ctx.moveTo(0, mouseY);
    ctx.lineTo(ref.width, mouseY);
    ctx.stroke();
  }, [mouseX, mouseY, imageData, canvasSplits.length]);

  useEffect(() => {
    if (!clicked) return;

    const lastSplitEndingY: number =
      canvasSplits.length !== 0
        ? canvasSplits[canvasSplits.length - 1][1][1]
        : 0;

    if (lastSplitEndingY >= mouseY) {
      toast("Invalid split", {
        description:
          "Split would create two overlapping images\n If you need finer control, use selection instead",
      });
      return;
    }
    const newSplit: Selection = [
      [0, lastSplitEndingY],
      [ref.width, mouseY],
    ];
    setCanvasSplits((prev) => [...prev, newSplit]);
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
    drawAllSelections(ctx, canvasSplits);

    ctx.beginPath();
    ctx.moveTo(mouseX, 0);
    ctx.lineTo(mouseX, ref.height);
    ctx.stroke();
  }, [mouseX, mouseY, imageData]);

  useEffect(() => {
    if (!clicked) return;

    const lastSplitEndingX: number =
      canvasSplits.length !== 0
        ? canvasSplits[canvasSplits.length - 1][1][0]
        : 0;

    if (lastSplitEndingX >= mouseX) {
      toast("Invalid split", {
        description:
          "Split would create two overlapping images\n If you need finer control, use selection instead",
      });
      return;
    }

    const newSplit: Selection = [
      [lastSplitEndingX, 0],
      [mouseX, ref.height - 1],
    ];
    setCanvasSplits((prev) => [...prev, newSplit]);
  }, [clicked, mouseX, mouseY, ref]);

  return null;
}

function BoxCanvasSelection() {
  const imageData = useAtomValue(resizedImageDataAtom);
  const [canvasSplits, setCanvasSplits] = useAtom(canvasSplitsAtom);
  const { ref, ctx } = useContext(CanvasContextGeneral);
  const { mouseX, mouseY, clicked } = useContext(CanvasContextMouse);

  const [firstSelection, setFirstSelection] = useState<Coordinate>();

  if (!imageData) return;

  useEffect(() => {
    drawImage(ref, imageData);
    drawAllSelections(ctx, canvasSplits);

    if (!!firstSelection) {
      ctx.beginPath();

      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        firstSelection[0],
        firstSelection[1],
        mouseX - firstSelection[0],
        mouseY - firstSelection[1]
      );
      ctx.stroke();
    }
  }, [mouseX, mouseY, imageData]);

  useEffect(() => {
    if (!clicked) return;

    if (!firstSelection) {
      setFirstSelection([mouseX, mouseY]);
      return;
    }

    // const newSplit: Selection = [firstSelection, [mouseX, mouseY]];
    let newSplit: Selection = [firstSelection, [mouseX, mouseY]];

    if (mouseX < firstSelection[0]) {
      newSplit = [
        [newSplit[1][0], newSplit[0][1]],
        [newSplit[0][0], newSplit[1][1]],
      ];
    }

    if (mouseY < firstSelection[1]) {
      newSplit = [
        [newSplit[0][0], newSplit[1][1]],
        [newSplit[1][0], newSplit[0][1]],
      ];
    }
    setCanvasSplits((prev) => [...prev, newSplit]);
    setFirstSelection(undefined);
  }, [clicked, mouseX, mouseY, ref]);

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
