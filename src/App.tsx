import { Navbar } from "./components/navbar";
import { AssistantProvider } from "./context/assistantProvider";
import { PageRoutes } from "./pageRoutes";
import { pdfjs } from "react-pdf";

export const App = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
  return (
    <>
      <AssistantProvider>
        <Navbar />
        <PageRoutes />
      </AssistantProvider>
    </>
  );
};
