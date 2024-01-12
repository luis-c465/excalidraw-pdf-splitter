import { useSetAtom } from "jotai";
import { blobAtom } from "./atoms";
import { selectFile } from "./util";

const LoadFileBtn: React.FC = () => {
  const setBlobAtom = useSetAtom(blobAtom);

  async function onClick() {
    const file = await selectFile(".excalidraw");
    setBlobAtom(file);
  }

  return (
    <button
      className="bg-blue-100 hover:bg-blue-400 transition-colors p-2 rounded text-lg"
      onClick={onClick}
    >
      Load file
    </button>
  );
};

export default LoadFileBtn;
