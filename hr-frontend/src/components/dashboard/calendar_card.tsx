"use client";
import React, { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

// ui
import { Table, cn, SortDescriptor, Pagination } from "@heroui/react";
import { RangeCalendar } from "@heroui/react";
import { Label, ListBox, Select } from "@heroui/react";

// icons
import { VscRequestChanges } from "react-icons/vsc";
import { TbCalendar, TbExternalLink, TbListDetails } from "react-icons/tb";
import { IoCheckmark } from "react-icons/io5";
import { PiPaperclip } from "react-icons/pi";

function CalendarCardContainer() {
  const [activeTab, setActiveTab] = useState("summary");
  const [focusedDate, setFocusedDate] = useState(() =>
    today(getLocalTimeZone()),
  );
  const [dateRange, setDateRange] = useState<{
    start: CalendarDate;
    end: CalendarDate;
  } | null>(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState<{
    id: number;
    value: string;
    label: string;
  } | null>(null);
  const getLeaveDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;
    return diff;
  };
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const getFileName = (filePath: string) =>
    filePath.split("/").pop() ?? filePath;
  return (
    <>
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-md overflow-hidden p-4">
        <RangeCalendar
          aria-label="วันที่ลา"
          firstDayOfWeek="mon"
          className="w-full"
          value={dateRange}
          onChange={setDateRange}
          focusedValue={focusedDate}
          onFocusChange={setFocusedDate}
        >
          <RangeCalendar.Header className="flex items-center justify-between px-1 pb-3 border-b border-zinc-100 mb-3">
            <RangeCalendar.Heading className="text-gray-800 text-base font-semibold" />
            <div className="flex gap-1 items-center">
              <RangeCalendar.NavButton
                slot="previous"
                className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              />
              <RangeCalendar.NavButton
                slot="next"
                className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              />
            </div>
          </RangeCalendar.Header>
          <RangeCalendar.Grid className="w-full">
            <RangeCalendar.GridHeader>
              {(day) => (
                <RangeCalendar.HeaderCell className="text-zinc-400 font-medium text-xs py-2 text-center w-full">
                  {day}
                </RangeCalendar.HeaderCell>
              )}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => {
                const isOutside =
                  date.month !== focusedDate.month ||
                  date.year !== focusedDate.year;
                const isStart = dateRange?.start
                  ? date.compare(dateRange.start) === 0
                  : false;
                const isEnd = dateRange?.end
                  ? date.compare(dateRange.end) === 0
                  : false;
                const isInRange =
                  dateRange?.start && dateRange?.end
                    ? date.compare(dateRange.start) > 0 &&
                      date.compare(dateRange.end) < 0
                    : false;
                const isSingleDay = isStart && isEnd;

                return (
                  <RangeCalendar.Cell
                    date={date}
                    className={cn(
                      "flex justify-center items-center w-full h-10 text-sm font-medium transition-all cursor-pointer select-none outline-none",
                      isOutside ? "text-zinc-300" : "text-zinc-700",
                      isInRange && "text-white bg-blue-400/30",
                      isStart &&
                        !isSingleDay &&
                        "rounded-l-full bg-gradient-to-r from-blue-500/80 to-blue-400/30 text-white",
                      isEnd &&
                        !isSingleDay &&
                        "rounded-r-full bg-gradient-to-l from-blue-500/80 to-blue-400/30 text-white",
                      (isStart || isEnd) &&
                        `text-white bg-blue-600 ${isStart ? "rounded-l-full" : "rounded-r-full"}`,
                      isSingleDay && "bg-blue-600 rounded-full text-white",
                      !isStart &&
                        !isEnd &&
                        !isInRange &&
                        "rounded-full hover:bg-blue-100 hover:text-blue-700",
                      date.compare(today(getLocalTimeZone())) === 0 &&
                        "text-sky-500 border border-sky-300",
                    )}
                  />
                );
              }}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>
      </div>
    </>
  );
}

export default CalendarCardContainer;
