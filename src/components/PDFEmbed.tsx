import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { Skeleton } from "./ui/skeleton";

type PDFEmbedProps = {
  src: string;
};
export default function PDFEmbed({ src }: PDFEmbedProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs() {
      return [];
    },
  });

  return (
    <div className="size-[900px]">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
        <div
          style={{
            height: "900px",
            width: "900px",
            position: "relative",
          }}
        >
          <Viewer fileUrl={src} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </Worker>
    </div>
  );
}

export function PDFEmbedSkeleton() {
  return <Skeleton className="size-[900px]" />;
}
