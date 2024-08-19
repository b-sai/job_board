import React from "react";
import {
  Star,
  Circle,
  ArrowRight,
  LucideIcon,
  SparklesIcon,
  EyeIcon,
} from "lucide-react";

interface ChipProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

const Chip: React.FC<ChipProps> = ({
  icon,
  children,
  className = "",
  color = "text-gray-800",
  bgColor = "bg-gray-100",
  borderColor = "border-gray-200",
}) => (
  <div
    className={`inline-flex items-center rounded-full border ${borderColor} ${bgColor} ${color} h-7 px-3 py-1 text-sm font-medium ${className}`}
  >
    {icon && (
      <span className="mr-1.5 flex items-center">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-4 h-4",
        })}
      </span>
    )}
    <span className="flex-shrink-0">{children}</span>
  </div>
);
interface SalaryChipProps {
  minSalary: number | null | undefined;
  maxSalary: number | null | undefined;
}

const SalaryChip: React.FC<SalaryChipProps> = ({ minSalary, maxSalary }) => {
  const formatSalary = (salary: number | null | undefined): string | null => {
    if (salary === null || salary === undefined || isNaN(salary)) {
      return null;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const minFormatted = formatSalary(minSalary);
  const maxFormatted = formatSalary(maxSalary);

  let displayText: string;
  if (minFormatted && maxFormatted) {
    displayText = `${minFormatted} - ${maxFormatted}`;
  } else if (minFormatted) {
    displayText = `From ${minFormatted}`;
  } else if (maxFormatted) {
    displayText = `Up to ${maxFormatted}`;
  } else {
    displayText = "Salary not specified";
  }

  return (
    <Chip
      icon={
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
    >
      {displayText}
    </Chip>
  );
};

interface DateChipProps {
  date: string;
}

const DateChip: React.FC<DateChipProps> = ({ date }) => {
  const formatDate = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - past.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <Chip
      icon={
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      }
    >
      {formatDate(date)}
    </Chip>
  );
};

interface LocationChipProps {
  location: string;
}

const LocationChip: React.FC<LocationChipProps> = ({ location }) => (
  <Chip
    icon={
      <svg
        className="mr-2 h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    }
  >
    {location}
  </Chip>
);

const CompleteMatchChip: React.FC = () => (
  <Chip
    color="text-indigo-700"
    bgColor="bg-indigo-50"
    borderColor="border-indigo-200"
    icon={<SparklesIcon className="mr-1 h-4 w-4" />}
  >
    Complete Match
  </Chip>
);

const StrongFitChip: React.FC = () => (
  <p className="text-sm font-bold text-green-600">Strong Fit</p>
);

const PartialMatchChip: React.FC = () => (
  <p className="text-sm font-bold text-yellow-600">Partial Match</p>
);

const WeakMatchChip: React.FC = () => (
  <p className="text-sm font-bold text-red-500">Weak Match</p>
);

const AppliedChip: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M7 13l3 3 7-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const createSvgIcon = (path: string) => (
  <svg
    className="mr-2 h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={path}
    />
  </svg>
);
const ViewedChip: React.FC = () => (
  <div className="pt-1">
    {createSvgIcon(
      "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    )}
  </div>
);
export {
  CompleteMatchChip,
  StrongFitChip,
  PartialMatchChip,
  WeakMatchChip,
  SalaryChip,
  DateChip,
  LocationChip,
  AppliedChip,
  ViewedChip,
};

