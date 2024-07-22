import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { cx } from "lib/cx";
import addPdfSrc from "public/assets/add-pdf.svg";

interface ResumeDropzoneProps {
  onFileUrlChange: (fileUrl: string) => void;
  onFileChange: (file: File | null) => void;
  className?: string;
  playgroundView?: boolean;
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({
  onFileUrlChange,
  onFileChange,
  className,
  playgroundView = false,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] =
    useState<boolean>(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState<boolean>(false);

  const hasFile = Boolean(file);

  const setNewFile = (newFile: File): void => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    const newFileUrl = URL.createObjectURL(newFile);
    setFile(newFile);
    setFileUrl(newFileUrl);
    onFileUrlChange(newFileUrl);
    onFileChange(newFile);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    if (newFile.name.endsWith(".pdf")) {
      setHasNonPdfFile(false);
      setNewFile(newFile);
    } else {
      setHasNonPdfFile(true);
    }
    setIsHoveredOnDropzone(false);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (!files) return;

    const newFile = files[0];
    setNewFile(newFile);
  };

  const onRemove = (): void => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(null);
    setFileUrl("");
    onFileUrlChange("");
    onFileChange(null);
  };

  return (
    <div
      className={cx(
        "mx-auto flex w-3/4 items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6",
        isHoveredOnDropzone && "border-sky-400",
        playgroundView ? "pb-6 pt-4" : "py-12",
        className
      )}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div
        className={cx(
          "text-center",
          playgroundView ? "space-y-2" : "space-y-3"
        )}
      >
        {!playgroundView && (
          <Image
            src={addPdfSrc}
            className="mx-auto h-14 w-14"
            alt="Add pdf"
            aria-hidden="true"
            priority
          />
        )}
        {!hasFile ? (
          <>
            <p
              className={cx(
                "pt-3 text-gray-700",
                !playgroundView && "text-lg font-semibold"
              )}
            >
              Browse a pdf file or drop it here
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="pl-7 font-semibold text-gray-900">
              {file?.name ?? "Unknown"} -{" "}
              {file ? getFileSizeString(file.size) : "0 KB"}
            </div>
            <button
              type="button"
              className="outline-theme-blue rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              title="Remove file"
              onClick={onRemove}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}
        <div className="pt-4">
          {!hasFile ? (
            <>
              <label
                className={cx(
                  "within-outline-theme-purple cursor-pointer rounded-full px-6 pb-2.5 pt-2 font-semibold shadow-sm",
                  playgroundView ? "border" : "bg-primary",
                  "inline-block text-center" // Added classes for multi-line support
                )}
              >
                <span className="inline-block">Browse file</span>{" "}
                {/* Wrapped text in a span */}
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  onChange={onInputChange}
                />
              </label>
              {hasNonPdfFile && (
                <p className="mt-6 text-red-400">Only pdf file is supported</p>
              )}
            </>
          ) : (
            <p className={cx("text-gray-500", !playgroundView && "mt-6")}>
              Note: {!playgroundView ? "Import" : "Parser"} works best on single
              column resume
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const getFileSizeString = (fileSizeB: number): string => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB";
  } else {
    return fileSizeMB.toPrecision(3) + " MB";
  }
};
