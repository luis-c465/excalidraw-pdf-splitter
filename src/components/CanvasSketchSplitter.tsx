import { useAtomValue } from "jotai";
import type { MouseEvent, MouseEventHandler } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IMAGE_WIDTH, resizedImageAtom } from "../atoms";

type Context = CanvasRenderingContext2D;
export default function CanvasSketchSplitter() {
  const [resizedImage] = useAtomValue(resizedImageAtom);
  console.log(resizedImage);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<Context | null>(null);
  const [[mouseX, mouseY], setMousePos] = useState<number[]>([0, 0]);

  const imageData = useMemo(
    () =>
      resizedImage &&
      new ImageData(
        resizedImage.getRGBAData({ clamped: true }) as any,
        resizedImage.width,
        resizedImage.height
      ),
    [resizedImage]
  );

  // On canvas mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !resizedImage) return;

    const context = canvas.getContext("2d");
    if (!context || !imageData) return;

    setContext(context);
    drawImage(canvas, imageData);
  }, [canvasRef, resizedImage]);

  const onMouseMove = useCallback<MouseEventHandler<HTMLCanvasElement>>((e) => {
    if (!context || !canvasRef.current || !imageData) return;

    drawImage(canvasRef.current, imageData);
    const [x, y] = toCanvasPosition(canvasRef.current, e);
    console.log(y);

    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(IMAGE_WIDTH, y);
    context.stroke();
  }, []);

  return <canvas ref={canvasRef} onMouseMove={onMouseMove} />;
}

function drawImage(canvas: HTMLCanvasElement, imageData: ImageData) {
  const context = canvas.getContext("2d")!;
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  context.putImageData(imageData, 0, 0);
}

function toCanvasPosition(
  canvas: HTMLCanvasElement,
  e: MouseEvent<HTMLCanvasElement>
) {
  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.x;
  const y = e.clientY - rect.y;
  return [x, y];
}
