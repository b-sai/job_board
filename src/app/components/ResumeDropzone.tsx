"use client";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { cx } from "lib/cx";
import addPdfSrc from "public/assets/add-pdf.svg";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
        "mx-auto flex w-[90%] items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-2",
        isHoveredOnDropzone && "border-sky-400",
        isMobile ? "py-2" : playgroundView ? "pb-4 pt-2" : "py-2",
        className
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div
        className={cx(
          "w-full text-center",
          isMobile ? "space-y-2" : "space-y-3"
        )}
      >
        {!playgroundView && !isMobile && (
          <Image
            src={addPdfSrc}
            className="mx-auto h-10 w-14"
            alt="Add pdf"
            aria-hidden="true"
            priority
          />
        )}

        {!hasFile ? (
          <div
            className={cx(
              "flex",
              isMobile
                ? "flex-row items-center justify-between"
                : "flex-col items-center"
            )}
          >
            <p
              className={cx(
                "text-gray-700 dark:text-gray-300",
                !playgroundView && "text-base font-semibold",
                isMobile ? "mr-2" : "mb-5"
              )}
            >
              Browse a pdf file or drop it here
            </p>
            <label
              className={cx(
                "within-outline-theme-purple cursor-pointer rounded-full px-4 py-2 font-semibold shadow-sm",
                playgroundView ? "border" : "bg-primary",
                "inline-block text-center",
                isMobile ? "flex-shrink-0" : ""
              )}
            >
              <span className="inline-block">Browse file</span>
              <input
                type="file"
                className="sr-only"
                accept=".pdf"
                onChange={onInputChange}
              />
            </label>
          </div>
        ) : (
          <div
            className={cx(
              "flex items-center justify-center",
              isMobile ? "flex-row" : "flex-col"
            )}
          >
            <div className="max-w-[20ch] truncate font-semibold text-gray-900 dark:text-gray-300">
              {file?.name ?? "Unknown"}
            </div>
            <button
              type="button"
              className={cx(
                "outline-theme-blue rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500",
                isMobile ? "ml-4" : "mt-4"
              )}
              title="Remove file"
              onClick={onRemove}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}

        {hasFile && !isMobile && (
          <p className={cx("text-gray-500", !playgroundView && "mt-4")}>
            Note: {!playgroundView ? "Import" : "Parser"} takes
            <br />
            5-10 seconds
          </p>
        )}

        {hasNonPdfFile && (
          <p className="mt-2 text-red-400">Only pdf file is supported</p>
        )}
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
