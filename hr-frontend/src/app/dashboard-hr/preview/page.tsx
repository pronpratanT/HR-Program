"use client";
import React from "react";
import Calendar from "@/components/dashboard/calendar";
import CalendarTest from "@/components/dashboard/calendar_test";
import Header from "@/components/layout/header";

export default function PreviewPage() {
  return (
    <>
      
      <main className="bg-stone-100 min-h-screen p-4 md:p-6 xl:p-10">
        <Header />
        <div className="mt-5">
          <CalendarTest />
        </div>
      </main>
    </>
  );
}
