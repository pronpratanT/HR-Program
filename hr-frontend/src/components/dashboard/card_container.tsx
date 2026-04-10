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

const LeaveOptions = [
  { id: 1, value: "Absent", label: "ขาดงาน(ชม.)" },
  { id: 2, value: "Late", label: "หักมาสาย(ชม.)" },
  {
    id: 3,
    value: "Sick with out medical certificate",
    label: "ป่วยไม่มีใบรับรองแพทย์(วัน)",
  },
  {
    id: 4,
    value: "Sick with medical certificate",
    label: "ป่วยมีใบรับรองแพทย์(วัน)",
  },
  { id: 5, value: "Personal Leave", label: "ลากิจ(วัน)" },
  {
    id: 6,
    value: "Personal Leave without pay",
    label: "ลากิจ(ไม่หักเงิน)(วัน)",
  },
  { id: 7, value: "Annual Leave", label: "ลาพักร้อน(วัน)" },
  { id: 8, value: "Maternity leave", label: "ลาคลอด" },
];

const sampleData = {
  id: 1,
  createdDate: "2024-06-01",
  StartDate: "2024-06-10",
  EndDate: "2024-06-12",
  leaveType: "ลาป่วย",
  reason: "ป่วยเป็นไข้หวัดใหญ่",
  file: "/hr-frontend/public/file/Medical_Certificate_TH.pdf",
};

function CardContainerComponent() {
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
    <div className="w-200">
      <div className="relative pt-8 mb-6">
        {/* Floating Tabs - top right */}
        <div className="absolute top-0 right-0 flex z-10">
          <button
            onClick={() => setActiveTab("summary")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-tl-xl text-sm font-semibold transition-colors cursor-pointer",
              activeTab === "summary"
                ? "bg-[#051f20] text-zinc-200 hover:text-white hover:bg-[#235347]"
                : "bg-zinc-100 text-zinc-900 shadow hover:bg-zinc-600 hover:text-white",
            )}
          >
            <TbListDetails className="size-4" />
            รายละเอียด
          </button>
          <button
            onClick={() => setActiveTab("leaveform")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-tr-xl text-sm font-semibold transition-colors cursor-pointer",
              activeTab === "leaveform"
                ? "bg-[#051f20] text-zinc-200 hover:text-white hover:bg-[#235347]"
                : "bg-zinc-100 text-zinc-900 shadow hover:bg-zinc-600 hover:text-white",
            )}
          >
            <VscRequestChanges className="size-4" />
            สร้างใบลา
          </button>
        </div>
        {/* Card Content */}
        <div className="bg-white rounded-b-2xl rounded-tl-2xl p-6 border border-zinc-200 shadow-md">
          {activeTab === "summary" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/20">
                  <TbListDetails className="text-emerald-400 size-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-800 leading-tight">
                    รายละเอียดการลา
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    ข้อมูลใบลา #{sampleData.id}
                  </p>
                </div>
              </div>

              <div className="mt-5 w-full mb-2 flex flex-col gap-4">
                {/* วันที่สร้างใบลา */}
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    วันที่สร้างใบลา
                  </span>
                  <span className="text-sm text-gray-800 px-3 py-2 rounded-lg bg-stone-50 border border-zinc-200">
                    {formatDate(sampleData.createdDate)}
                  </span>
                </div>

                {/* ช่วงวันที่ลา */}
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    ช่วงวันที่ลา
                  </span>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 border border-zinc-200">
                    <TbCalendar className="text-zinc-500 size-4 shrink-0" />
                    <span className="text-sm text-gray-800">
                      {formatDate(sampleData.StartDate)}
                    </span>
                    <span className="text-zinc-500 text-xs">–</span>
                    <span className="text-sm text-gray-800">
                      {formatDate(sampleData.EndDate)}
                    </span>
                    <span className="ml-auto text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2 py-0.5">
                      {getLeaveDays(sampleData.StartDate, sampleData.EndDate)}{" "}
                      วัน
                    </span>
                  </div>
                </div>

                {/* ประเภทการลา */}
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    ประเภทการลา
                  </span>
                  <span className="text-sm text-gray-800 px-3 py-2 rounded-lg bg-stone-50 border border-zinc-200">
                    {sampleData.leaveType}
                  </span>
                </div>

                {/* เหตุผล */}
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    เหตุผล
                  </span>
                  <span className="text-sm text-gray-800 px-3 py-2 rounded-lg bg-stone-50 border border-zinc-200">
                    {sampleData.reason}
                  </span>
                </div>

                {/* เอกสารแนบ */}
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    เอกสารแนบ
                  </span>

                  {sampleData.file ? (
                    <div className="flex flex-col gap-2">
                      {/* ชื่อไฟล์ + ปุ่มเปิดใน tab ใหม่ */}
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 border border-zinc-200">
                        <PiPaperclip className="text-zinc-500 size-4 shrink-0" />
                        <span className="text-sm text-gray-800 truncate flex-1">
                          {getFileName(sampleData.file)}
                        </span>
                        <a
                          href="/file/Medical_Certificate_TH.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors shrink-0"
                        >
                          <TbExternalLink className="size-3.5" />
                          เปิดในแท็บใหม่
                        </a>
                      </div>

                      {/* PDF Preview */}
                      <div className="rounded-lg overflow-hidden border border-zinc-200 bg-stone-50">
                        <iframe
                          src="/file/Medical_Certificate_TH.pdf"
                          className="w-full"
                          style={{ height: "480px" }}
                          title={getFileName(sampleData.file)}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-800 px-3 py-2 rounded-lg bg-stone-50 border border-zinc-200">
                      ไม่มีเอกสารแนบ
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
          {activeTab === "leaveform" && (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/20">
                  <VscRequestChanges className="text-emerald-400 size-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-800 leading-tight">
                    สร้างใบลา
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    กรอกข้อมูลเพื่อยื่นคำขอลา
                  </p>
                </div>
              </div>

              <form className="space-y-5">
                {/* วันที่ลา */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    วันที่ลา
                  </label>
                  <div className="rounded-xl border border-zinc-700/80 bg-stone-50/60 overflow-hidden">
                    <RangeCalendar
                      aria-label="วันที่ลา"
                      firstDayOfWeek="mon"
                      className="w-full p-3"
                      value={dateRange}
                      onChange={setDateRange}
                      focusedValue={focusedDate}
                      onFocusChange={setFocusedDate}
                    >
                      <RangeCalendar.Header className="flex items-center justify-between px-1 pb-2 border-b border-zinc-700/50 mb-2">
                        <RangeCalendar.Heading className="text-gray-800 text-sm font-semibold" />
                        <div className="flex gap-1 items-center">
                          <RangeCalendar.NavButton
                            slot="previous"
                            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                          />
                          <RangeCalendar.NavButton
                            slot="next"
                            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                          />
                        </div>
                      </RangeCalendar.Header>
                      <RangeCalendar.Grid className="w-full">
                        <RangeCalendar.GridHeader>
                          {(day) => (
                            <RangeCalendar.HeaderCell className="text-zinc-500 font-medium text-xs tracking-wide px-3 py-1 text-center">
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
                                  "flex justify-center items-center px-3 py-1.5 text-sm transition-colors cursor-pointer hover:bg-blue-500/20",
                                  // "flex justify-center items-center px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer hover:bg-blue-500/20"
                                  //"relative flex justify-center items-center w-9 h-9 text-sm transition-colors cursor-pointer select-none outline-none"
                                  // สีข้อความ
                                  isOutside ? "text-zinc-300" : "text-zinc-600",
                                  // แถบ in-range
                                  isInRange && "text-gray-600 bg-blue-500/20",
                                  // แถบครึ่งขวาที่ start
                                  isStart &&
                                    !isSingleDay &&
                                    "from-transparent to-blue-500/20",
                                  // แถบครึ่งซ้ายที่ end
                                  isEnd &&
                                    !isSingleDay &&
                                    "from-transparent to-blue-500/20",
                                  // วงกลม start/end
                                  (isStart || isEnd) &&
                                    `text-white bg-blue-600 ${isStart ? "rounded-l-full bg-gradient-to-r from-blue-600" : "rounded-r-full bg-gradient-to-l from-blue-600"}`,
                                  // `text-white bg-blue-600 ${isStart ? 'rounded-l-full' : 'rounded-r-full'}`
                                  //"text-white after:absolute after:inset-0 after:rounded-full after:bg-blue-600 after:-z-10"
                                  // วันเดียว
                                  isSingleDay &&
                                    "bg-blue-600 rounded-full text-white",
                                  // hover ปกติ (ไม่ใช่ selected)
                                  !isStart &&
                                    !isEnd &&
                                    !isInRange &&
                                    "rounded-full hover:bg-sky-600 hover:text-white",
                                  // วันปัจจุบัน
                                  date.compare(today(getLocalTimeZone())) ===
                                    0 && "text-sky-500",
                                )}
                              />
                            );
                          }}
                        </RangeCalendar.GridBody>
                      </RangeCalendar.Grid>
                    </RangeCalendar>
                  </div>
                </div>

                {/* ประเภทการลา */}
                <div className="space-y-2 relative">
                  <label className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    ประเภทการลา
                  </label>
                  <Select
                    className="w-full"
                    placeholder="เลือกประเภทการลา"
                    selectedKey={selectedLeaveType?.value ?? ""}
                    onSelectionChange={(key) => {
                      const found = LeaveOptions.find((o) => o.value === key);
                      if (found)
                        setSelectedLeaveType({
                          id: found.id,
                          value: found.value,
                          label: found.label,
                        });
                    }}
                  >
                    <Label className="sr-only">ประเภทการลา</Label>
                    <Select.Trigger className="w-full flex items-center justify-between rounded-xl bg-stone-50 border border-zinc-700/80 px-4 h-11 text-zinc-700 text-sm cursor-pointer hover:border-zinc-500 transition-colors">
                      <Select.Value className="text-zinc-300 truncate">
                        {(item) => {
                          if (!item || item.isPlaceholder) {
                            return (
                              <span className="text-zinc-600">
                                เลือกประเภทการลา
                              </span>
                            );
                          }
                          return <span>{item.selectedText}</span>;
                        }}
                      </Select.Value>
                      <Select.Indicator className="text-zinc-600 flex-shrink-0 ml-2" />
                    </Select.Trigger>
                    <Select.Popover
                      style={{ width: "var(--trigger-width)" }}
                      className="bg-stone-50 border border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <ListBox className="py-1">
                        {LeaveOptions.map((option) => (
                          <ListBox.Item
                            key={option.id}
                            id={option.value}
                            textValue={option.label}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-stone-200 cursor-pointer transition-colors"
                          >
                            <span>{option.label}</span>
                            {selectedLeaveType?.value === option.value && (
                              <ListBox.ItemIndicator className="text-emerald-400">
                                <IoCheckmark className="size-5" />
                              </ListBox.ItemIndicator>
                            )}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* เหตุผล */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    เหตุผล
                  </label>
                  <textarea
                    className="w-full rounded-xl bg-stone-50 border border-zinc-700/80 px-4 py-3 text-zinc-700 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                    rows={3}
                    placeholder="โปรดระบุเหตุผลการลา..."
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-700/50" />

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 cursor-pointer"
                >
                  <VscRequestChanges className="size-4" />
                  ส่งใบลา
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardContainerComponent;
