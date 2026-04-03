"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// icons
import { FiDownload } from "react-icons/fi";
import { BiCheckCircle } from "react-icons/bi";
import { BiXCircle } from "react-icons/bi";

// ant design ui
import { DatePicker, Space } from "antd";
import type { ConfigProviderProps, RadioChangeEvent } from "antd";
import dayjs, { type Dayjs } from "dayjs";

// components
import UserCard from "../../../components/layout/user-card";

// Flexible date format type
type Generic = string;
type GenericFn = (value: Dayjs) => string;
export type FormatType =
  | Generic
  | GenericFn
  | Array<Generic | GenericFn>
  | {
      format: string;
      type?: "mask";
    };

// Format date utility
function formatDate(date: Dayjs | null, format: FormatType): string {
  if (!date) return "";
  if (typeof format === "string") {
    return date.format(format);
  }
  if (typeof format === "function") {
    return format(date);
  }
  if (Array.isArray(format)) {
    for (const f of format) {
      if (typeof f === "string") return date.format(f);
      if (typeof f === "function") return f(date);
    }
    return date.format("YYYY-MM-DD");
  }
  if (typeof format === "object" && format.format) {
    return date.format(format.format);
  }
  return date.format("YYYY-MM-DD");
}

function ExportDataPage() {
  const router = useRouter();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // datepicker state
  type SizeType = ConfigProviderProps["componentSize"];
  const [size, setSize] = useState<SizeType>("large");

  // Check authentication and department on page load
  useEffect(() => {
    const match = document.cookie.match(new RegExp("(^| )authToken=([^;]+)"));
    const token = match ? match[2] : null;
    if (!token) {
      router.push("/login");
      return;
    }
    // ตรวจสอบ department_id
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.department_id !== 10109) {
          alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
          router.push("/");
        }
      } catch {}
    }
  }, [router]);

  const handleExport = () => {
    // console.log("Exporting data from", startDate, "to", endDate);
    // console.log(
    //   "Auth Token:",
    //   document.cookie.replace(
    //     /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
    //     "$1",
    //   ),
    // );
    if (startDate.trim() === "" || endDate.trim() === "") {
      setError("Please select a valid date range.");
      return;
    }
    try {
      const responseAtt = fetch(
        `http://192.168.2.139:8080/api/attendance/attendance-logs/export/txt?start_date=${startDate}&end_date=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
          },
        },
      );
      const responseOT = fetch(
        `http://192.168.2.139:5000/generate-ot/${startDate}/${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
          },
        },
      );
      Promise.all([responseAtt, responseOT])
        .then(async ([resAtt, resOT]) => {
          if (!resAtt.ok) {
            const errorData = await resAtt.json();
            throw new Error(`Attendance export failed: ${errorData.message}`);
          }
          if (!resOT.ok) {
            const errorData = await resOT.json();
            throw new Error(`OT export failed: ${errorData.message}`);
          }
          const blobAtt = await resAtt.blob();
          const blobOT = await resOT.blob();
          const urlAtt = window.URL.createObjectURL(blobAtt);
          const urlOT = window.URL.createObjectURL(blobOT);
          const linkAtt = document.createElement("a");
          const linkOT = document.createElement("a");
          linkAtt.href = urlAtt;
          linkOT.href = urlOT;
          linkAtt.download = `attendance_${startDate}_to_${endDate}.txt`;
          linkOT.download = `ot_${startDate}_to_${endDate}.xlsx`;
          document.body.appendChild(linkAtt);
          document.body.appendChild(linkOT);
          linkAtt.click();
          linkOT.click();
          linkAtt.remove();
          linkOT.remove();
          window.URL.revokeObjectURL(urlAtt);
          window.URL.revokeObjectURL(urlOT);
          setSuccess("Export successful!");
          setError("");
        })
        .catch((error) => {
          console.error("Export error:", error);
          setError(`Export failed: ${error.message}`);
          setSuccess("");
        });
    } catch {
      setSuccess("");
      setError("An unexpected error occurred during export. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* UserCard ลอยอยู่มุมขวาบน */}
      <div className="absolute top-4 right-4">
        <UserCard />
      </div>

      {/* Export Card อยู่ตรงกลางจริงๆ */}
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1a1625] to-[#2a2640] w-full p-4 sm:p-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-2">Export Data</h1>
          <h2 className="text-base text-purple-200 mb-6">Attendance and OT Data</h2>
          <form
            className="flex flex-col gap-6"
            onSubmit={e => {
              e.preventDefault();
              handleExport();
            }}
          >
            <div>
              <label className="block text-sm text-white mb-1">Select Date Range</label>
              <DatePicker.RangePicker
                size="large"
                format="YYYY-MM-DD"
                className="w-full rounded-lg"
                onChange={(dates) => {
                  const fmt: FormatType = "YYYY-MM-DD";
                  const start = formatDate(dates ? dates[0] : null, fmt);
                  const end = formatDate(dates ? dates[1] : null, fmt);
                  setStartDate(start);
                  setEndDate(end);
                }}
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-lg shadow hover:from-purple-600 hover:to-indigo-700 transition flex items-center justify-center gap-2"
            >
              <FiDownload className="w-5 h-5" />
              Export
            </button>
            {error && (
              <p className="text-red-400 bg-red-900/30 border border-red-500/40 mb-2 p-2 rounded flex items-center gap-2">
                <BiXCircle className="w-5 h-5" />
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-400 bg-green-900/30 border border-green-500/40 mb-2 p-2 rounded flex items-center gap-2">
                <BiCheckCircle className="w-5 h-5" />
                {success}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default ExportDataPage;
