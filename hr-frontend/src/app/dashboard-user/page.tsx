"use client";
import React from "react";
import Header from "@/components/layout/header";
import TableComponent from "@/components/dashboard/table";
import CardDetailComponent from "@/components/dashboard/card_detail";

function UserDashboardPage() {
  return (
    <>
      <main className="bg-stone-100 min-h-screen p-4 md:p-6 xl:p-10">
        <Header />
        <div>
          <div className="mt-5">
            <CardDetailComponent />
          </div>
          <TableComponent />
        </div>
      </main>
    </>
  );
}

export default UserDashboardPage;
