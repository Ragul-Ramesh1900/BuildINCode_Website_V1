import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterType = "Day" | "Week" | "Month" | "Year" | "Custom";

interface FilterChipProps {
  label: FilterType;
  active: boolean;
  onClick: () => void;
}

const FilterChip = ({ label, active, onClick }: FilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border shrink-0",
        active
          ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
          : "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100"
      )}
    >
      <div
        className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center border",
          active ? "bg-[#BFFF00] border-[#BFFF00]" : "border-gray-300"
        )}
      >
        {active && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
      </div>
      {label}
    </button>
  );
};

export const DateFilter = () => {
  const [activeType, setActiveType] = React.useState<FilterType>("Custom");
  // Simplified calendar state for the demo
  const daysInJuly = 31;
  const startDay = 2; // Tuesday (0=Sun, 1=Mon, 2=Tue)
  const days = Array.from({ length: daysInJuly }, (_, i) => i + 1);
  const prevMonthDays = [27, 28]; // Just matching the image
  const nextMonthDays = [1, 2, 3];

  const filterTypes: FilterType[] = ["Day", "Week", "Month", "Year", "Custom"];

  return (
    <div className="w-full max-w-[480px] bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100 font-sans text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Filter by</h2>
        <button className="p-2.5 bg-gray-500 rounded-full text-white hover:opacity-90 transition-opacity">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {filterTypes.map((type) => (
          <FilterChip
            key={type}
            label={type}
            active={activeType === type}
            onClick={() => setActiveType(type)}
          />
        ))}
      </div>

      {/* Date Range Display */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="flex items-center gap-3 px-5 py-4 bg-[#F8F7FF] border border-[#EBE7FF] rounded-2xl group cursor-pointer hover:border-primary/30 transition-colors">
          <CalendarIcon className="w-5 h-5 text-[#C4B5FD]" />
          <span className="text-[15px] font-semibold">2 July 2024</span>
        </div>
        <div className="flex items-center gap-3 px-5 py-4 bg-[#F8F7FF] border border-[#EBE7FF] rounded-2xl group cursor-pointer hover:border-primary/30 transition-colors">
          <CalendarIcon className="w-5 h-5 text-[#C4B5FD]" />
          <span className="text-[15px] font-semibold">2 July 2024</span>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center px-4">
          <button className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold">July 2025</span>
          <button className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {/* Previous Month Days */}
          {prevMonthDays.map((day) => (
            <div key={`prev-${day}`} className="py-4 text-center text-lg font-medium text-gray-300">
              {day}
            </div>
          ))}
          
          {/* Current Month Days */}
          {days.map((day) => (
            <div
              key={day}
              className={cn(
                "py-4 text-center text-lg font-medium cursor-pointer rounded-2xl transition-all relative group",
                day === 13
                  ? "bg-[#D9F99D] text-black"
                  : "hover:bg-gray-50"
              )}
            >
              {day}
            </div>
          ))}

          {/* Next Month Days */}
          {nextMonthDays.map((day) => (
            <div key={`next-${day}`} className="py-4 text-center text-lg font-medium text-gray-300">
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
