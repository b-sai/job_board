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

export { CompleteMatchChip, StrongFitChip, PartialMatchChip, WeakMatchChip };
