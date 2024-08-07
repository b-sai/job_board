import React from "react";
import { Star, Circle, ArrowRight, LucideIcon } from "lucide-react";

interface BaseChipProps {
  color: string;
  bgColor: string;
  borderColor: string;
  text: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

const BaseChip: React.FC<BaseChipProps> = ({
  color,
  bgColor,
  borderColor,
  text,
  icon: Icon,
  className = "",
  children,
}) => (
  <div
    className={`inline-flex select-none items-center whitespace-nowrap rounded-full px-2 py-0.5 text-sm font-medium transition-all duration-300 ease-in-out ${color} ${bgColor} ${borderColor} border shadow-sm hover:shadow-md ${className}`}
  >
    {Icon ? <Icon size={16} className="mr-1.5" strokeWidth={2.5} /> : children}
    <span>{text}</span>
  </div>
);

const CompleteMatchChip: React.FC = () => (
  <BaseChip
    color="text-indigo-700"
    bgColor="bg-indigo-50"
    borderColor="border-indigo-200"
    text="Complete Match"
  >
    <span className="mr-1 text-sm" role="img" aria-label="sparkles">
      ✨
    </span>
  </BaseChip>
);

const StrongFitChip: React.FC = () => (
  <BaseChip
    color="text-green-700"
    bgColor="bg-green-50"
    borderColor="border-green-200"
    text="Strong Fit"
  />
);

const PartialMatchChip: React.FC = () => (
  <BaseChip
    color="text-yellow-700"
    bgColor="bg-yellow-50"
    borderColor="border-yellow-200"
    text="Partial Match"
  />
);

const WeakMatchChip: React.FC = () => (
  <BaseChip
    color="text-red-700"
    bgColor="bg-red-50"
    borderColor="border-red-200"
    text="Weak Match"
  />
);

interface ChipProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ icon, children, className = "" }) => (
  <div
    className={`inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 ${className}`}
  >
    {icon}
    {children}
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

interface DemoCaseItem {
  minSalary: number | null;
  maxSalary: number | null;
  date: string;
  location: string;
}

export {
  CompleteMatchChip,
  StrongFitChip,
  PartialMatchChip,
  WeakMatchChip,
  SalaryChip,
  DateChip,
  LocationChip,
};

