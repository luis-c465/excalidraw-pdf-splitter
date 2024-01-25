import { Button } from "@/components/ui/button";
import { canvasSplitsAtom, fileAtom, sourceImageAtom } from "@/lib/atoms";
import { IconArrowBack } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

export default function ConvertAgainBtn() {
  const setFile = useSetAtom(fileAtom);
  const setSourceImage = useSetAtom(sourceImageAtom);
  const setCanvasSplits = useSetAtom(canvasSplitsAtom);

  return (
    <Button
      variant="outline"
      onClick={() => {
        setFile(null);
        setSourceImage(null);
        setCanvasSplits([]);
      }}
    >
      <IconArrowBack size={24} />
      Convert again
    </Button>
  );
}
