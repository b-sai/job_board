"use client";
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { cx } from "lib/cx";
import { useMediaQuery } from "react-responsive";
import { useResume } from "ResumeContext";
import FakeLoadingBar from "./FakeLoading";

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
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] =
    useState<boolean>(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { useUserId, isParsing, fileUrl, setFileUrl, dummyResumeName } =
    useResume();
  const hasFile = Boolean(file);

  const setNewFile = (newFile: File, isDummy = false): void => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    const newFileUrl = URL.createObjectURL(newFile);
    setFile(newFile);
    setFileUrl(isDummy ? "" : newFileUrl);
    onFileUrlChange(isDummy ? "" : newFileUrl);
    onFileChange(newFile);
  };
  const createDummyFile = () => {
    return new File(["dummy content"], dummyResumeName, {
      type: "application/pdf",
    });
  };
  const dummyFile = createDummyFile();

  useEffect(() => {
    if (useUserId !== null && useUserId) {
      setNewFile(dummyFile, true);
    }
  }, [useUserId]);

  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    if (newFile.name.endsWith(".pdf") || newFile.name.endsWith(".docx")) {
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
                accept=".pdf, .docx"
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

        {hasFile && !isMobile && isParsing && <FakeLoadingBar />}

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
