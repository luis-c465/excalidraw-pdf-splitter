import { Context, getMousePos } from "@/lib/canvas";
import {
  MouseEventHandler,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type CanvasContextType = {
  ctx: Context;
  ref: HTMLCanvasElement;
};
export const CanvasContextGeneral = createContext<CanvasContextType>({
  // @ts-expect-error Baka
  ctx: null,
  // @ts-expect-error Baka
  ref: null,
});

export const CanvasContextMouse = createContext({
  mouseX: 0,
  mouseY: 0,
  clicked: false,
});
export type CanvasWithContextProps = {
  children: React.JSX.Element | React.JSX.Element[];
};

export default function CanvasWithContext({
  children,
}: CanvasWithContextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<Context | null>(null);
  const [[mouseX, mouseY], setMousePos] = useState<number[]>([0, 0]);
  const [clicked, setClicked] = useState(false);

  // On canvas mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    setContext(context);
  }, [canvasRef.current]);

  const onMouseMove = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (e) => {
      if (!canvasRef.current) return;

      const { x, y } = getMousePos(canvasRef.current, e);
      setMousePos([x, y]);
    },
    [canvasRef.current]
  );

  const onClick = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (e) => {
      if (!canvasRef.current) return;

      setClicked(true);

      const { x, y } = getMousePos(canvasRef.current, e);
      setMousePos([x, y]);

      setTimeout(() => setClicked(false));
    },
    [setClicked, canvasRef.current]
  );

  return (
    <CanvasContextGeneral.Provider
      value={{
        // @ts-expect-error Baka
        ctx: context,
        // @ts-expect-error Baka
        ref: canvasRef.current,
      }}
    >
      <CanvasContextMouse.Provider
        value={{
          mouseX: mouseX,
          mouseY: mouseY,
          clicked: clicked,
        }}
      >
        <div className="rounded-md overflow-scroll basis-6/12 w-fit max-h-full">
          <canvas
            ref={canvasRef}
            onMouseMove={onMouseMove}
            onClick={onClick}
            className="w-fit h-fit"
          />
          {!!canvasRef.current && !!context && children}
        </div>
      </CanvasContextMouse.Provider>
    </CanvasContextGeneral.Provider>
  );
}
