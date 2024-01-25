import { resizedImageAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import FileDrop from "./FileDrop";
import FileLoader from "./FileLoader";

export default function FileUploader() {
  const [resizedImage] = useAtomValue(resizedImageAtom);
  if (resizedImage) return null;

  return (
    <>
      <FileDrop />
      <FileLoader />
    </>
  );
}
