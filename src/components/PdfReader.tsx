import { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { MdOutlineZoomOut, MdOutlineZoomIn } from "react-icons/md";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

interface PdfReaderProps {
  file: string;
}

export const PdfReader = ({ file }: PdfReaderProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  const onPdfLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const zoomIn = () => {
    setScale(scale + 0.1);
  };

  const zoomOut = () => {
    setScale(scale > 0.1 ? scale - 0.1 : scale);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex justify-between w-full mt-4">
        <button
          className="px-4 py-2 rounded hover:text-xl hover:py-0 transition-all duration-150"
          onClick={zoomOut}
        >
          <MdOutlineZoomOut />
        </button>
        <button
          className="px-4 py-2 rounded hover:text-xl hover:py-0 transition-all duration-150"
          onClick={zoomIn}
        >
          <MdOutlineZoomIn />
        </button>
      </div>
      <div className="w-full flex justify-center overflow-auto">
        <Document
          file={file}
          onLoadSuccess={onPdfLoadSuccess}
          className="w-full max-w-2xl "
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
      <div className="flex justify-between w-full">
        <button
          className="px-4 py-2 rounded hover:text-xl hover:py-0 transition-all duration-150 cursor-pointer"
          onClick={prevPage}
          disabled={pageNumber <= 1}
        >
          <IoArrowBack />
        </button>
        <p className="self-center">
          Page {pageNumber} of {numPages}
        </p>
        <button
          className="px-4 py-2 rounded hover:text-xl hover:py-0 transition-all duration-150"
          onClick={nextPage}
          disabled={pageNumber >= numPages}
        >
          <IoArrowForward />
        </button>
      </div>
    </div>
  );
};
