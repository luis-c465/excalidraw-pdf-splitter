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

export function drawSelection(canvas: HTMLCanvasElement, selection: Selection) {
  const ctx = gctx(canvas);
  ctx.beginPath();
  ctx.moveTo(x, canvas.height);
  ctx.lineTo(x, 0);
  ctx.stroke();
}

export function gctx(canvas: HTMLCanvasElement) {
  return canvas.getContext("2d")!;
}
