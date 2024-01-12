import {
  Excalidraw,
  MainMenu,
  THEME,
  loadFromBlob,
  exportToCanvas,
} from "@excalidraw/excalidraw";
import { useAtomValue } from "jotai";
import { useState } from "react";
import LoadFileBtn from "./LoadFileBtn";
import { blobAtom } from "./atoms";
import { useAsyncEffect } from "./hooks";

// Fuck the excalidraw api
// this is torture
// holy shit pls just export the types :((
type ExcalidrawTypes = React.ComponentProps<typeof Excalidraw>;
type ExcaliAPI = Parameters<NonNullable<ExcalidrawTypes["excalidrawAPI"]>>[0];

// @ts-expect-error Cry about it
const zoom: number & { _brand: "normalizedZoom" } = 0.2;

function App() {
  const blob = useAtomValue(blobAtom);

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcaliAPI | null>(null);
  const UIOptions: ExcalidrawTypes["UIOptions"] = {
    canvasActions: {
      changeViewBackgroundColor: false,
    },
  };

  useAsyncEffect(async () => {
    if (!blob || !excalidrawAPI) return;

    const scene = await loadFromBlob(blob, null, null);

    scene.appState = {
      ...scene.appState,
      zoom: {
        value: zoom,
      },
      theme: THEME.DARK,
      zenModeEnabled: true,
    };
    excalidrawAPI.updateScene(scene);
  }, [blob]);

  return (
    <div className="flex gap-3 flex-col">
      <header className="flex gap-4 m-4 items-center">
        <h1 className="text-xl font-sans">Excalidraw PDF Exporter tool</h1>
        <LoadFileBtn />

        <p>Load a file then use the canvas to to split the </p>
      </header>

      <div style={{ height: "80vh", width: "100vw" }}>
        <Excalidraw
          UIOptions={UIOptions}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          onChange={}
          zenModeEnabled
          theme={THEME.DARK}
          initialData={{
            appState: {
              zoom: {
                value: zoom,
              },
            },
          }}
        >
          <MainMenu>
            <MainMenu.Item
              onSelect={() =>
                window.alert("Woah you pressed the secret button :)")
              }
            >
              Does nothing
            </MainMenu.Item>
          </MainMenu>
        </Excalidraw>
      </div>
    </div>
  );
}

export default App;
