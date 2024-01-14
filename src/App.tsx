import FileDrop from "./FileDrop";
import FileLoader from "./FileLoader";
import SketchSplitter from "./SketchSplitter";

function App() {
  return (
    <main className="flex flex-col gap-3 items-center">
      <header>
        <h1>Excalidraw to PDF tool</h1>
      </header>

      <div className="flex flex-col gap-2">
        <FileDrop />
        <FileLoader />

        <SketchSplitter />
      </div>
    </main>
  );
}

export default App;
