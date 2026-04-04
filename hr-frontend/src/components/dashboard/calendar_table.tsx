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

type CountAttendanceDaily = {
  date: string;
  present_today: number;
  absent_today: number;
};

const mockCountAttendanceDaily: CountAttendanceDaily[] = [
  { date: "2026-03-05", present_today: 2, absent_today: 2 },
  { date: "2026-03-06", present_today: 3, absent_today: 1 },
  { date: "2026-03-07", present_today: 1, absent_today: 3 },
];

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
              className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              <MdOutlineKeyboardArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handlerNextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              <MdOutlineKeyboardArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="w-full flex-1 overflow-x-auto">
          <div className="min-w-180 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm xl:min-w-0">
            {/* Calendar header */}
            <div className="grid grid-cols-7 border-b border-zinc-100">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                <div
                  key={day}
                  className={`flex items-center justify-center py-2.5 text-xs font-semibold uppercase tracking-wide
                    ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-zinc-400"}
                    ${i !== 6 ? "border-r border-zinc-100" : ""}`}
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {days.map((d, idx) => {
                const events = mockCountAttendanceDaily.filter(
                  (event) => event.date === d.date,
                );
                const isToday = d.date === todayText;
                const isCurrent = d.type === "current";
                const colIdx = idx % 7;
                return (
                  <div
                    key={idx}
                    className={[
                      "flex min-h-16 flex-col p-2 transition-all duration-150 border-r border-b border-zinc-100",
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
                          ? colIdx === 0
                            ? "text-red-400"
                            : colIdx === 6
                            ? "text-blue-400"
                            : "text-gray-700"
                          : "text-zinc-300",
                      ].join(" ")}
                    >
                      {d.day}
                    </span>
                    {/* Event Cards */}
                    <div className="mt-1 space-y-1">
                      {events.map((event) => (
                        <div key={event.date}>
                          <div className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-700 flex items-center justify-between">
                            <span>Present</span>
                            <span className="font-semibold">{event.present_today}</span>
                          </div>
                          <div className="mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium bg-red-50 text-red-500 flex items-center justify-between">
                            <span>Absent</span>
                            <span className="font-semibold">{event.absent_today}</span>
                          </div>
                        </div>
                      ))}
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
