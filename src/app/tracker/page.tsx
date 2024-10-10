"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTracker } from "TrackerProvider";
import { apiWrapper } from "../../utils/apiWrapper";
import Job from "../../app/job-board/jobs";
import { posthog } from "posthog-js";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AppliedJobs = () => {
  const { data: session, status } = useSession();
  const { originalAppliedJobs, appliedJobs } = useTracker();
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const allJobs = Array.from(originalAppliedJobs).concat(
    Array.from(appliedJobs)
  );
  const userId: string | undefined =
    posthog.get_distinct_id() || process.env.NEXT_PUBLIC_USER_ID;
  console.log(status);

  useEffect(() => {
    const fetchJobs = async () => {
      if (status === "authenticated") {
        setIsLoading(true);
        try {
          let jobsToFetch = allJobs;

          if (allJobs.length === 0) {
            const response = await apiWrapper(
              `/interactions/?user_id=${userId}`
            );
            jobsToFetch = response.map((job: any) =>
              job.interaction_type === "applied" ? job.application_id : null
            );
            jobsToFetch = jobsToFetch.filter((job) => job !== null);
          }

          const jobsArray = await Promise.all(
            jobsToFetch.map(async (id) => {
              const job: Job = await apiWrapper(`/job/${id}/`, "GET");
              return job;
            })
          );
          setJobsData(jobsArray);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchJobs();
  }, [status]);

  if (status !== "authenticated") {
    return (
      <Alert>
        <AlertDescription>Please sign up to view applied jobs</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Applied Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Company</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead>Job Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsData.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.company}</TableCell>
                <TableCell>
                  {new Date(job.date_posted || "").toLocaleDateString()}
                </TableCell>
                <TableCell>{job.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AppliedJobs;
