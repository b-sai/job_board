import axios, { AxiosError } from "axios";
import { apiWrapper } from "../../utils/apiWrapper";

export async function upsertJobs({
  resume,
  userId,
  fileName,
}: {
  resume: any;
  userId: any;
  fileName: string;
}) {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("user_id", userId);
  formData.append("file_name", fileName);

  const response = await apiWrapper("/upsert_user/", "POST", formData);
  return response;
}
