import { resizedImageLoadedAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import FileDrop from "./FileDrop";
import FileLoader from "./FileLoader";

export default function FileUploader() {
  const resizedImageLoaded = useAtomValue(resizedImageLoadedAtom);
  if (resizedImageLoaded) return null;

  return (
    <>
      <FileDrop />
      <FileLoader />
    </>
  );
}
