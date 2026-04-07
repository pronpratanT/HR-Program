"use client";

import React, { useState } from "react";

// utils
import { getDaysArray, pad } from "@/utils/calendar";

// icons
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { LuListFilter } from "react-icons/lu";

import { Mock } from "node:test";

type LeaveHistory = {
  id: number;
  start_date: string;
  end_date: string;
  leavetype: string;
};

const mockLeaveHistory: LeaveHistory[] = [
  {
    id: 1,
    start_date: "2026-03-05",
    end_date: "2026-03-05",
    leavetype: "ลาป่วย(ใบแพทย์)",
  },
  {
    id: 2,
    start_date: "2026-03-06",
    end_date: "2026-03-06",
    leavetype: "ลากิจ",
  },
  {
    id: 3,
    start_date: "2026-03-09",
    end_date: "2026-03-11",
    leavetype: "ลาพักร้อน",
  },
  {
    id: 4,
    start_date: "2026-03-13",
    end_date: "2026-03-13",
    leavetype: "ลาป่วย(ไม่มีใบแพทย์)",
  },
];

const getEventSegment = (event: LeaveHistory, date: string) => {
  if (event.start_date === event.end_date) return "single";
  if (date === event.start_date) return "start";
  if (date === event.end_date) return "end";
  if (date > event.start_date && date < event.end_date) return "middle";
  return null;
};

function CalendarTableComponent() {
  const today = new Date();
  // const year = today.getFullYear();
  // const month = today.getMonth(); // ปัจจุบัน (0=มกราคม)
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const days = getDaysArray(year, month);
  const todayText = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const handlerPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const handlerNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  return (
    <>
      {/* Calendar container */}
      <div className="flex w-full h-full min-w-0 flex-col">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h5 className="text-gray-800 text-xl font-semibold tracking-tight">
            {new Date(year, month).toLocaleString("en-US", {
              month: "long",
            })}{" "}
            {year}
          </h5>
          <div className="flex items-center gap-1">
            <button
              onClick={handlerPrevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handlerNextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer"
            >
              <MdOutlineKeyboardArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="w-full flex-1 overflow-x-auto">
          <div className="min-w-180 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm xl:min-w-0">
            {/* Calendar header */}
            <div className="grid grid-cols-7 border-b border-zinc-100">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => (
                  <div
                    key={day}
                    className={`flex items-center justify-center py-2.5 text-xs font-semibold uppercase tracking-wide
                    ${i === 6 ? "text-red-400" : "text-zinc-400"}
                    ${i !== 6 ? "border-r border-zinc-100" : ""}`}
                  >
                    {day}
                  </div>
                ),
              )}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {days.map((d, idx) => {
                const events = mockLeaveHistory
                  .filter(
                    (event) =>
                      event.start_date <= d.date && event.end_date >= d.date,
                  )
                  .map((event) => ({
                    ...event,
                    segment: getEventSegment(event, d.date),
                  }));

                const isToday = d.date === todayText;
                const isCurrent = d.type === "current";
                const colIdx = idx % 7;

                return (
                  <div
                    key={idx}
                    className={[
                      "flex min-h-16 flex-col p-2 transition-all duration-150 border-r border-b border-zinc-100 overflow-hidden",
                      isCurrent ? "cursor-pointer" : "",
                      isToday
                        ? "bg-blue-50 ring-2 ring-inset ring-blue-400 z-10 relative"
                        : isCurrent
                          ? "bg-white hover:bg-zinc-50"
                          : "bg-zinc-50/60",
                    ].join(" ")}
                  >
                    {/* date */}
                    <span
                      className={[
                        "text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full",
                        isToday
                          ? "bg-blue-500 text-white"
                          : isCurrent
                            ? colIdx === 6
                              ? "text-red-400"
                              : "text-gray-700"
                            : "text-zinc-300",
                      ].join(" ")}
                    >
                      {d.day}
                    </span>

                    {/* Event Bars */}
                    <div className="mt-1 space-y-1">
                      {events.map((event) => {
                        const { segment } = event;
                        const isStart =
                          segment === "start" || segment === "single";
                        const isEnd = segment === "end" || segment === "single";

                        return (
                          <div
                            key={event.id}
                            className={[
                              "h-[18px] text-[10px] font-medium flex items-center overflow-hidden",
                              event.leavetype === "ลาป่วย(ใบแพทย์)"
                                ? "bg-blue-100 text-blue-800"
                                : event.leavetype === "ลากิจ"
                                  ? "bg-amber-100 text-amber-800"
                                  : event.leavetype === "ลาพักร้อน"
                                    ? "bg-violet-100 text-violet-800"
                                    : event.leavetype === "ลาป่วย(ไม่มีใบแพทย์)"
                                      ? "bg-red-100 text-red-800"
                                      : "",
                              // single day
                              isStart && isEnd ? "rounded px-1.5" : "",
                              // start of multi-day: rounded left, extend right
                              isStart && !isEnd ? "rounded-l pl-1.5 -mr-3" : "",
                              // end of multi-day: rounded right, extend left
                              !isStart && isEnd ? "rounded-r pr-1.5 -ml-3" : "",
                              // middle: extend both sides, no rounding
                              !isStart && !isEnd ? "-mx-3" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {/* Show label only at the start */}
                            {isStart && (
                              <span className="font-semibold truncate">
                                {event.leavetype}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarTableComponent;
