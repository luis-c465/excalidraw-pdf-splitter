import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { PDF_JS_WORKER_URL } from "./PDFEmbed";
import pdfDemoURL from "/demo.pdf?url";

export default function PDFDemo() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs() {
      return [];
    },
  });

  return (
    <div className="size-[700px]">
      <Worker workerUrl={PDF_JS_WORKER_URL}>
        <div
          style={{
            height: "700px",
            width: "700px",
            position: "relative",
          }}
        >
          <Viewer
            fileUrl={pdfDemoURL}
            plugins={[defaultLayoutPluginInstance]}
            theme="dark"
          />
        </div>
      </Worker>
    </div>
  );
}
