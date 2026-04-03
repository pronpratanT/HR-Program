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

type EditScans = {
  type: string;
  action: string;
  scan_time: string;
  created_at: string;
  created_by: number;
};

type present = {
  user_id: number;
  employee_id: string;
  departmentID: number;
  fname: string;
  lname: string;
  first_in: string;
  last_out: string;
  edited_scans_json: EditScans[];
};

type absent = {
  user_id: number;
  employee_id: string;
  departmentID: number;
  fname: string;
  lname: string;
};

type AttendanceDailyDate = {
  date: string;
  present: present[];
  absent: absent[];
  present_today: number;
  absent_today: number;
};

type CountAttendanceDaily = {
  date: string;
  present_today: number;
  absent_today: number;
}

type Departments = {
  id: number;
  dep_no: number;
  name: string;
};

function CalendarTest() {
  const today = new Date();
  // const year = today.getFullYear();
  // const month = today.getMonth(); // ปัจจุบัน (0=มกราคม)
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const days = getDaysArray(year, month);
  const todayText = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  // console.log(days);

  // filter state
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState<
    number[] | null
  >(null);

  const mockCountAttendanceDaily: CountAttendanceDaily[] = [
    { date: "2026-03-05", present_today: 2, absent_today: 2 },
    { date: "2026-03-06", present_today: 3, absent_today: 1 },
    { date: "2026-03-07", present_today: 1, absent_today: 3 },
  ];

  const mockDepartments: Departments[] = [
    { id: 101, dep_no: 1, name: "IT" },
    { id: 102, dep_no: 2, name: "MK" },
    { id: 103, dep_no: 3, name: "HR" },
  ];

  const mockData2: AttendanceDailyDate[] = [
    {
      date: "2026-03-05",
      present: [
        {
          user_id: 1,
          employee_id: "E001",
          departmentID: 101,
          fname: "John",
          lname: "Doe",
          first_in: "08:00",
          last_out: "17:00",
          edited_scans_json: [
            {
              type: "in",
              action: "added",
              scan_time: "2026-03-05T08:00:00Z",
              created_at: "2026-03-05T08:00:00Z",
              created_by: 0,
            },
            {
              type: "out",
              action: "added",
              scan_time: "2026-03-05T12:00:00Z",
              created_at: "2026-03-05T12:00:00Z",
              created_by: 0,
            },
            {
              type: "in",
              action: "added",
              scan_time: "2026-03-05T13:00:00Z",
              created_at: "2026-03-05T13:00:00Z",
              created_by: 0,
            },
            {
              type: "out",
              action: "added",
              scan_time: "2026-03-05T18:00:00Z",
              created_at: "2026-03-05T18:00:00Z",
              created_by: 0,
            },
          ],
        },
        {
          user_id: 3,
          employee_id: "E003",
          departmentID: 103,
          fname: "Alice",
          lname: "Johnson",
          first_in: "09:00",
          last_out: "18:00",
          edited_scans_json: [
            {
              type: "in",
              action: "added",
              scan_time: "2026-03-05T09:00:00Z",
              created_at: "2026-03-05T09:00:00Z",
              created_by: 0,
            },
            {
              type: "out",
              action: "added",
              scan_time: "2026-03-05T18:00:00Z",
              created_at: "2026-03-05T18:00:00Z",
              created_by: 0,
            },
          ],
        },
        
      ],
      absent: [
        {
          user_id: 2,
          employee_id: "E002",
          departmentID: 102,
          fname: "Jane",
          lname: "Smith",
        },
        {
          user_id: 4,
          employee_id: "E004",
          departmentID: 104,
          fname: "Bob",
          lname: "Brown",
        },
      ],
      present_today: 2,
      absent_today: 2,
    },
  ];

  // calendar handler
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

  // handler for filter
  const handleSelectAllDepartments = () => {
    setSelectedDepartmentIds((prev) => (prev === null ? [] : null));
  };

  const handleDepartmentChange = (departmentId: number, checked: boolean) => {
    setSelectedDepartmentIds((previousDepartmentIds) => {
      const allDepartmentIds = mockDepartments.map(
        (department) => department.id,
      );
      const currentDepartmentIds = previousDepartmentIds ?? allDepartmentIds;
      const nextDepartmentIds = checked
        ? [...new Set([...currentDepartmentIds, departmentId])]
        : currentDepartmentIds.filter((id) => id !== departmentId);

      return nextDepartmentIds.length === allDepartmentIds.length
        ? null
        : nextDepartmentIds;
    });
  };

  return (
    <div>
      <section className="relative w-full p-4 md:p-6 xl:p-10">
        <div className="flex flex-col items-start gap-6 xl:flex-row xl:justify-between xl:gap-10">
          {/* Calendar Date select detail */}
          <div className="mt-1 flex w-full flex-col justify-start xl:max-w-md">
            <div className="flex items-center gap-4 mb-5">
              <h1 className="text-gray-900 text-2xl font-semibold">Details</h1>
            </div>
            <div className="w-full border border-gray-200 rounded-xl p-4 shadow-md shadow-gray-300 bg-stone-50">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                <span className="mt-1 flex items-center text-sm text-gray-500">
                  Date:
                </span>
                <span className="w-full text-sm font-medium text-gray-800">
                  {mockData2.map((data) => (
                    <div key={data.date}>
                      {(() => {
                        const filteredPresent =
                          selectedDepartmentIds === null
                            ? data.present
                            : data.present.filter((person) =>
                                selectedDepartmentIds.includes(
                                  person.departmentID,
                                ),
                              );
                        const filteredAbsent =
                          selectedDepartmentIds === null
                            ? data.absent
                            : data.absent.filter((person) =>
                                selectedDepartmentIds.includes(
                                  person.departmentID,
                                ),
                              );
                        return (
                          <>
                            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <div className="wrap-break-word">{data.date}</div>
                              {/* Filter Button */}
                              <div className="relative">
                                <button
                                  className="cursor-pointer rounded-md border border-gray-300 px-2 py-1 text-sm transition-colors hover:bg-gray-100 hover:text-indigo-500"
                                  onClick={() => setShowFilter(!showFilter)}
                                >
                                  <LuListFilter className="inline-block w-4 h-4" />{" "}
                                  Filter
                                </button>
                                {showFilter && (
                                  <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-md border border-gray-200 bg-white p-3 shadow-lg sm:w-44">
                                    <label className="mb-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-indigo-50">
                                      <input
                                        type="checkbox"
                                        checked={selectedDepartmentIds === null}
                                        onChange={handleSelectAllDepartments}
                                        className="h-4 w-4 accent-indigo-600"
                                      />
                                      <span className="text-sm text-gray-700">
                                        ทุกแผนก
                                      </span>
                                    </label>
                                    {mockDepartments.map((dep) => (
                                      <label
                                        key={dep.id}
                                        className="mb-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-indigo-50"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={
                                            selectedDepartmentIds === null ||
                                            selectedDepartmentIds.includes(
                                              dep.id,
                                            )
                                          }
                                          onChange={(event) =>
                                            handleDepartmentChange(
                                              dep.id,
                                              event.target.checked,
                                            )
                                          }
                                          className="h-4 w-4 accent-indigo-600"
                                        />
                                        <span className="text-sm text-gray-700">
                                          {dep.name}
                                        </span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* Present Section */}
                            <div className="mb-5">
                              <div className="flex items-center mb-3 gap-2">
                                <FaUser className="inline-block ml-2 w-5 h-5 text-indigo-500" />{" "}
                                Present{" "}
                                <span className="text-xs text-gray-500">
                                  Total:({filteredPresent.length})
                                </span>
                              </div>
                              {/* Data */}
                              {filteredPresent.length === 0 && (
                                <div className="rounded-md border border-dashed border-gray-300 px-3 py-4 text-center text-sm text-gray-500">
                                  ไม่พบข้อมูลของแผนกที่เลือก
                                </div>
                              )}
                              {filteredPresent.map((p) => (
                                <div key={p.user_id} className="mb-2">
                                  <button
                                    className="border rounded-md border-indigo-500 p-2 w-full cursor-pointer hover:bg-indigo-400 hover:text-white"
                                    onClick={() =>
                                      setShowDetail(
                                        showDetail === p.user_id
                                          ? null
                                          : p.user_id,
                                      )
                                    }
                                  >
                                    <div className="flex justify-between items-center">
                                      {p.fname} {p.lname}
                                      <IoIosArrowDown className="inline-block ml-2" />
                                    </div>
                                  </button>
                                  {showDetail === p.user_id && (
                                    <div className="relative">
                                      <div
                                        className="absolute left-5 -top-2 -translate-x-1/2 w-0 h-0"
                                        style={{
                                          borderLeft: "10px solid transparent",
                                          borderRight: "10px solid transparent",
                                          borderBottom: "10px solid #e5e7eb",
                                        }}
                                      />
                                      <div className="mt-2 p-3 bg-gray-200 rounded-md">
                                        <p className="mb-1">
                                          Department: {p.departmentID}
                                        </p>
                                        <p className="mb-1">
                                          First In: {p.first_in}
                                        </p>
                                        <p className="mb-1">
                                          Last Out: {p.last_out}
                                        </p>
                                        <p className="">
                                          Edited Scans{" "}
                                          {p.edited_scans_json.length > 0 ? (
                                            <div className="relative pl-6">
                                              {/* เส้น timeline */}
                                              <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-300"></div>
                                              <ul className="mt-1">
                                                {p.edited_scans_json.map(
                                                  (edit, index) => (
                                                    <li
                                                      key={index}
                                                      className="relative mb-4"
                                                    >
                                                      {/* จุด timeline */}
                                                      <span className="absolute -left-2 top-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></span>
                                                      <div className="ml-2">
                                                        <div className="font-semibold text-sm text-indigo-700">
                                                          {edit.type.toUpperCase()}{" "}
                                                          -{" "}
                                                          {edit.action.toUpperCase()}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                          {new Date(
                                                            edit.scan_time,
                                                          ).toLocaleString(
                                                            "th-TH",
                                                            {
                                                              timeZone:
                                                                "Asia/Bangkok",
                                                            },
                                                          )}{" "}
                                                          by{" "}
                                                          {edit.created_by === 0
                                                            ? "System"
                                                            : `User ${edit.created_by}`}
                                                        </div>
                                                      </div>
                                                    </li>
                                                  ),
                                                )}
                                              </ul>
                                            </div>
                                          ) : (
                                            "No edits"
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            {/* Absent Section */}
                            <div className="mb-5">
                              <div className="flex items-center mb-3 gap-2">
                                <FaUserAltSlash className="inline-block ml-2 w-5 h-5 text-red-500" />{" "}
                                Absent{" "}
                                <span className="text-xs text-gray-500">
                                  Total:({filteredAbsent.length})
                                </span>
                              </div>
                              {/* Data */}
                              {filteredAbsent.length === 0 && (
                                <div className="rounded-md border border-dashed border-gray-300 px-3 py-4 text-center text-sm text-gray-500">
                                  ไม่พบข้อมูลของแผนกที่เลือก
                                </div>
                              )}
                              {filteredAbsent.map((a) => (
                                <div key={a.user_id} className="mb-2">
                                  <button 
                                  className="border rounded-md border-red-500 p-2 w-full cursor-pointer hover:bg-red-400 hover:text-white"
                                  onClick={() =>
                                      setShowDetail(
                                        showDetail === a.user_id
                                          ? null
                                          : a.user_id,
                                      )
                                    }
                                  >
                                    <div className="flex justify-between items-center">
                                      {a.fname} {a.lname}
                                      <IoIosArrowDown className="inline-block ml-2" />
                                    </div>
                                  </button>
                                  {showDetail === a.user_id && (
                                    <div className="relative">
                                      <div
                                        className="absolute left-5 -top-2 -translate-x-1/2 w-0 h-0"
                                        style={{
                                          borderLeft: "10px solid transparent",
                                          borderRight: "10px solid transparent",
                                          borderBottom: "10px solid #e5e7eb",
                                        }}
                                      />
                                      <div className="mt-2 p-3 bg-gray-200 rounded-md">
                                        <p className="mb-1">
                                          Department: {a.departmentID}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  ))}
                </span>
              </div>
            </div>
          </div>
          {/* Calendar container */}
          <div className="flex w-full min-w-0 flex-col justify-start">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h5 className="text-gray-900 text-2xl font-semibold">
                {new Date(year, month).toLocaleString("en-US", {
                  month: "long",
                })}{" "}
                {year}
              </h5>
              <div className="flex items-center space-x-2">
                <button onClick={handlerPrevMonth}>
                  <MdOutlineKeyboardArrowLeft className="w-7 h-7 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded cursor-pointer" />
                </button>
                <button onClick={handlerNextMonth}>
                  <MdOutlineKeyboardArrowRight className="w-7 h-7 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded cursor-pointer" />
                </button>
              </div>
            </div>
            <div className="w-full overflow-x-auto pb-2">
              <div className="min-w-180 overflow-hidden rounded-xl border border-indigo-200 bg-white xl:min-w-0">
              {/* Calendar header */}
              <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
                <div className="flex items-center justify-center rounded-tl-xl border-r border-indigo-200 bg-indigo-50 py-2.5 text-xs font-medium text-indigo-600 md:py-3.5 md:text-sm">
                  Sun
                </div>
                <div className="flex items-center justify-center border-r border-indigo-200 bg-indigo-50 py-2.5 text-xs font-medium text-indigo-600 md:py-3.5 md:text-sm">
                  Mon
                </div>
                <div className="flex items-center justify-center border-r border-indigo-200 bg-indigo-50 py-2.5 text-xs font-medium text-indigo-600 md:py-3.5 md:text-sm">
                  Tue
                </div>
                <div className="flex items-center justify-center border-r border-indigo-200 bg-indigo-50 py-2.5 text-xs font-medium text-indigo-600 md:py-3.5 md:text-sm">
                  Wed
                </div>
                <div className="flex items-center justify-center border-r border-indigo-200 bg-indigo-50 py-2.5 text-xs font-medium text-indigo-600 md:py-3.5 md:text-sm">
                  Thu
                </div>
                <div className="flex items-center justify-center border-r border-indigo-200 bg-indigo-50 py-2.5 text-xs font-medium text-indigo-600 md:py-3.5 md:text-sm">
                  Fri
                </div>
                <div className="flex items-center justify-center rounded-tr-xl border-l border-indigo-200 bg-indigo-50 py-2.5 text-xs font-medium text-indigo-600 md:py-3.5 md:text-sm">
                  Sat
                </div>
              </div>
              {/* Calendar grid */}
              <div className="grid grid-cols-7">
                {days.map((d, idx) => {
                  const events = mockCountAttendanceDaily.filter(
                    (event) => event.date === d.date,
                  );
                  return (
                    <div
                      key={idx}
                      className={`flex min-h-24 flex-col border-indigo-200 p-2.5 transition-all duration-300 hover:bg-indigo-50 md:min-h-28 md:p-3.5 xl:aspect-square
                  ${d.type === "current" ? "bg-gray-50 text-gray-800  cursor-pointer border-r border-b" : "bg-gray-100 text-gray-400  border-r border-b"} 
                  ${d.date === todayText ? "relative z-10 border border-emerald-400 bg-emerald-100 text-emerald-900 font-bold shadow-sm ring-2 ring-inset ring-emerald-300 hover:bg-emerald-100" : ""}`}
                    >
                      {/* date */}
                      <span className="text-xs font-semibold md:text-sm">{d.day}</span>
                      {/* Event Cards */}
                      <div className="mt-1 space-y-1 md:mt-2 md:space-y-2">
                        {events.map((event) => (
                          <div key={event.date}>
                            {/* Present Event */}
                            <div className="rounded-md bg-emerald-100 px-1.5 py-1.5 text-[10px] font-medium text-emerald-700 transition-colors hover:bg-emerald-200 md:px-2 md:py-2 md:text-xs">
                              <div className="flex items-center justify-between font-normal text-emerald-700">
                                <div>Present</div>
                                <div>{event.present_today}</div>
                              </div>
                            </div>

                            {/* Absent Event */}
                            <div className="mt-1 rounded-md bg-red-100 px-1.5 py-1.5 text-[10px] font-medium text-red-700 transition-colors hover:bg-red-200 md:mt-2 md:px-2 md:py-2 md:text-xs">
                              <div className="flex items-center justify-between font-normal text-red-700">
                                <div>Absent</div>
                                <div>{event.absent_today}</div>
                              </div>
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
        </div>
      </section>
    </div>
  );
}

export default CalendarTest;
