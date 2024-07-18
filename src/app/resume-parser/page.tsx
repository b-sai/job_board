"use client";
import { useState, useEffect } from "react";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "components/ResumeDropzone";
import { cx } from "lib/cx";
import { Heading, Link, Paragraph } from "components/documentation";
import { ResumeTable } from "resume-parser/ResumeTable";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { ResumeParserAlgorithmArticle } from "resume-parser/ResumeParserAlgorithmArticle";
import { useResume } from "ResumeContext";

const defaultFileUrl = "";
export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  // const lines = groupTextItemsIntoLines(textItems || []);
  // const sections = groupLinesIntoSections(lines);
  // const resume = extractResumeFromSections(sections);
  const { setResume } = useResume();

  useEffect(() => {
    async function test() {
      const textItems = await readPdf(fileUrl);
      setTextItems(textItems);
      const lines = groupTextItemsIntoLines(textItems || []);
      const sections = groupLinesIntoSections(lines);
      const resumeData = extractResumeFromSections(sections);
      setResume(resumeData);
    }
    if (fileUrl !== defaultFileUrl) {
      test();
    }
  }, [fileUrl, setResume]);

  return (
    <main className="h-full w-full overflow-hidden">
      <div className="mt-4 text-center">
        <Heading level={1} className="!mt-[1.2em]">
          Drop Your Resume to get personalized recommendations
        </Heading>
      </div>
      <div className="mt-3">
        <ResumeDropzone
          onFileUrlChange={(fileUrl) => setFileUrl(fileUrl || defaultFileUrl)}
          playgroundView={true}
        />
      </div>
    </main>
  );
}
