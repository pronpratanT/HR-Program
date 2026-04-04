"use client";

import React from "react";
import { Card } from "@heroui/react";

// icons
import { TbCalendar, TbExternalLink, TbListDetails } from "react-icons/tb";

// container
import CalendarCardComponent from "./calendar_card";
import Calendar from "./calendar_table";

const ExternalLinkIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polyline
      points="15 3 21 3 21 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="10"
      y1="14"
      x2="21"
      y2="3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const leaveTypes = [
  {
    title: "ลาป่วย (มีใบรับรองแพทย์)",
    total: 7,
    used: 2,
    iconBg: "bg-blue-50",
    barColor: "bg-blue-500",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path
          d="M9 12l2 2 4-4"
          stroke="#185FA5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          stroke="#185FA5"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    title: "ลาป่วย (ไม่มีใบรับรองแพทย์)",
    total: 7,
    used: 2,
    iconBg: "bg-green-50",
    barColor: "bg-green-500",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          stroke="#3B6D11"
          strokeWidth="1.5"
        />
        <path
          d="M12 7v5l3 3"
          stroke="#3B6D11"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "ลากิจ",
    total: 7,
    used: 2,
    iconBg: "bg-amber-50",
    barColor: "bg-amber-400",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          stroke="#BA7517"
          strokeWidth="1.5"
        />
        <path
          d="M16 2v4M8 2v4M3 10h18"
          stroke="#BA7517"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "ลาพักร้อน",
    total: 7,
    used: 2,
    iconBg: "bg-purple-50",
    barColor: "bg-purple-400",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
          stroke="#534AB7"
          strokeWidth="1.5"
        />
        <path
          d="M9 22V12h6v10"
          stroke="#534AB7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function CardDetailComponent() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-2 gap-4 py-3">
            {leaveTypes.map((leave) => {
              const remaining = leave.total - leave.used;
              const percent = Math.round((leave.used / leave.total) * 100);
              // ...existing code...
              return (
                <div
                  key={leave.title}
                  className="bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col gap-3 hover:border-zinc-300 transition-colors duration-150"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${leave.iconBg} flex items-center justify-center shrink-0`}
                    >
                      {leave.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {leave.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        สิทธิ์ทั้งหมด {leave.total} วัน
                      </p>
                    </div>
                  </div>
                  {/* Progress */}
                  <div className="flex flex-col gap-1.5">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${leave.barColor}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>ใช้ไป {leave.used} วัน</span>
                      <span>เหลือ {remaining} วัน</span>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="pt-2.5 border-t border-zinc-100 flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                    รายละเอียด
                    <ExternalLinkIcon />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center py-3">
          <div className="w-full">
            {/* <CalendarCardComponent /> */}
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDetailComponent;
