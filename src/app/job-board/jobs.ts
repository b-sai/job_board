interface Job {
  id: number;
  title: string;
  company?: string;
  description?: string;
  job_url_final?: string;
  date_posted?: string;
  location_arr?: string[];
  score?: number;
  image_url?: string;
  min_amount?: number;
  max_amount?: number;
  internship_latest_year?: string | null;
}
export default Job;
