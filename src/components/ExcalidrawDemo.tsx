import { useAsyncEffect } from "@/lib/hooks";
import { Excalidraw, loadFromBlob } from "@excalidraw/excalidraw";
import { Skeleton } from "./ui/skeleton";
import excalidrawDemoFileURL from "/demo.excalidraw?url";

export default function ExcalidrawDemo() {
  const { isLoading, result } = useAsyncEffect(async () => {
    const req = await fetch(excalidrawDemoFileURL);
    const file = await req.blob();
    const scene = await loadFromBlob(file, null, null);
    return scene;
  }, []);

  if (isLoading || !result) return <Skeleton className="size-[500px]" />;

  return (
    <div className="size-[700px]">
      <Excalidraw
        viewModeEnabled
        initialData={{
          ...result,
          appState: {
            ...result.appState,
            zenModeEnabled: true,
            zoom: 0.5 as any,
            theme: "dark",
          },
          scrollToContent: true,
        }}
      />
    </div>
  );
}
