import type { Selection } from "./crop";
export type Context = CanvasRenderingContext2D;
export function drawImage(canvas: HTMLCanvasElement, imageData: ImageData) {
  const context = canvas.getContext("2d")!;
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  context.putImageData(imageData, 0, 0);
}

export function toCanvasPosition(
  canvas: HTMLCanvasElement,
  e: React.MouseEvent<HTMLCanvasElement>
) {
  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.x;
  const y = e.clientY - rect.y;
  return [x, y];
}

export function drawHorizontalLine(canvas: HTMLCanvasElement, y: number) {
  const ctx = gctx(canvas);
  ctx.beginPath();
  ctx.moveTo(canvas.width, y);
  ctx.lineTo(0, y);
  ctx.stroke();
}

export function drawVerticalLine(canvas: HTMLCanvasElement, x: number) {
  const ctx = gctx(canvas);
  ctx.beginPath();
  ctx.moveTo(x, canvas.height);
  ctx.lineTo(x, 0);
  ctx.stroke();
}

// export function drawSelection(canvas: HTMLCanvasElement, selection: Selection) {
//   const ctx = gctx(canvas);
//   ctx.beginPath();
//   ctx.moveTo(x, canvas.height);
//   ctx.lineTo(x, 0);
//   ctx.stroke();
// }

export function gctx(canvas: HTMLCanvasElement) {
  return canvas.getContext("2d")!;
}

export function drawSelection(ctx: Context, s: Selection) {
  ctx.globalAlpha = 0.2;
  const [[x1, y1], [x2, y2]] = s;
  const width = x2 - x1;
  const height = y2 - y1;
  console.log({ x1, y1, x2, y2, width, height });
  ctx.beginPath();
  ctx.rect(x1, y1, width, height);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.globalAlpha = 1.0;
}