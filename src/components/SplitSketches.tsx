export default function SplitSketches() {
  return (
    <div className="flex gap-2 flex-wrap">
      {/* {splitBase64Images.map(ImagePreview)} */}
    </div>
  );
}

function ImagePreview(src: string) {
  return <img src={src} alt="Split image" className="rounded-lg" />;
}
