"use client";
import React from "react";
import Header from "@/components/layout/header";
import TableComponent from "@/components/dashboard/table";

function RequestPage() {
  return (
    <>
      <main className="bg-stone-100 min-h-screen p-4 md:p-6 xl:p-10">
        <Header />
        <div className="mt-10">
          <TableComponent />
        </div>
      </main>
    </>
  );
}

export default RequestPage;
