"use client";
import React, { useMemo, useState } from "react";

// heroui components
import { Table, cn, SortDescriptor, Pagination } from "@heroui/react";

// icons
import { IoIosArrowUp } from "react-icons/io";

// components
import CardComponent from "./card_container";

type Data = {
  date: string;
  shiftCode: string;
  shiftName: string;
  agreementResult: string;
  cardSwipeType: string;
  deductionMethod: string;
  amount: string;
};

function StatusBadge({ status }: { status: string }) {
  const isOnLeave = status === "On Leave";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        isOnLeave
          ? "bg-amber-100 text-amber-700"
          : "bg-emerald-100 text-emerald-700"
      }`}
    >
      {status}
    </span>
  );
}

function SortableHeader({
  children,
  sortDirection,
}: {
  children: React.ReactNode;
  sortDirection?: "ascending" | "descending";
}) {
  return (
    <span className="flex items-center justify-between">
      {children}
      {!!sortDirection && (
        <IoIosArrowUp
          className={cn(
            "size-3 transform transition-transform duration-100 ease-out",
            sortDirection === "descending" ? "rotate-180" : "",
          )}
        />
      )}
    </span>
  );
}

const ROWS_PER_PAGE = 15;

function TableComponent() {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
    direction: "ascending",
  });

  const [mockData] = React.useState<Data[]>([
    {
      date: "25/02/2569",
      shiftCode: "00",
      shiftName: "โปรแกรมหาเองจากกะในวันนี้",
      agreementResult: "ลากิจ",
      cardSwipeType: "กลับก่อนเวลา(ออกงาน08.01-17.00)ไม่เข้ามาอีก",
      deductionMethod: "ตามบันทึก",
      amount: "00.06",
    },
    {
      date: "10/03/2569",
      shiftCode: "01",
      shiftName: "โปรแกรมหาเองจากกะในวันนี้",
      agreementResult: "ลากิจ",
      cardSwipeType: "กลับก่อนเวลา(ออกงาน08.01-17.00)ไม่เข้ามาอีก",
      deductionMethod: "ตามบันทึก",
      amount: "00.06",
    },
    {
      date: "15/03/2569",
      shiftCode: "02",
      shiftName: "โปรแกรมหาเองจากกะในวันนี้",
      agreementResult: "ลากิจ",
      cardSwipeType: "กลับก่อนเวลา(ออกงาน08.01-17.00)ไม่เข้ามาอีก",
      deductionMethod: "ตามบันทึก",
      amount: "00.06",
    },
    {
      date: "18/03/2569",
      shiftCode: "00",
      shiftName: "โปรแกรมหาเองจากกะในวันนี้",
      agreementResult: "ลากิจ",
      cardSwipeType: "กลับก่อนเวลา(ออกงาน08.01-17.00)ไม่เข้ามาอีก",
      deductionMethod: "ตามบันทึก",
      amount: "00.06",
    },
    {
      date: "21/03/2569",
      shiftCode: "01",
      shiftName: "โปรแกรมหาเองจากกะในวันนี้",
      agreementResult: "ลากิจ",
      cardSwipeType: "กลับก่อนเวลา(ออกงาน08.01-17.00)ไม่เข้ามาอีก",
      deductionMethod: "ตามบันทึก",
      amount: "00.06",
    },
    {
      date: "24/03/2569",
      shiftCode: "02",
      shiftName: "โปรแกรมหาเองจากกะในวันนี้",
      agreementResult: "ลากิจ",
      cardSwipeType: "กลับก่อนเวลา(ออกงาน08.01-17.00)ไม่เข้ามาอีก",
      deductionMethod: "ตามบันทึก",
      amount: "00.06",
    },
  ]);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(mockData.length / ROWS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const sortedData = useMemo(() => {
    return [...mockData].sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      const cmp = dateA.getTime() - dateB.getTime();
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [mockData, sortDescriptor]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return sortedData.slice(start, start + ROWS_PER_PAGE);
  }, [sortedData, page]);

  const rangeStart = (page - 1) * ROWS_PER_PAGE + 1;
  const rangeEnd = Math.min(page * ROWS_PER_PAGE, mockData.length);

  return (
    <div className="mt-8 flex flex-col lg:flex-row justify-between items-start gap-5">
      {/* Card Container with Tabs */}
      <CardComponent />
      {/* Table Container Responsive */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] bg-[#1c1c1e] rounded-2xl overflow-hidden border border-zinc-700/50 w-full">
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="รายการขาด/มาสาย/กลับก่อน"
                className="min-w-full"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
              >
                <Table.Header className="bg-[#2c2c2e]">
                  <Table.Column
                    isRowHeader
                    id="date"
                    allowsSorting
                    className="py-2 px-2 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-zinc-400"
                  >
                    {({ sortDirection }) => (
                      <SortableHeader sortDirection={sortDirection}>
                        วันที่ลา
                      </SortableHeader>
                    )}
                  </Table.Column>
                  <Table.Column className="py-2 px-2 sm:py-3 sm:px-6 text-center text-xs sm:text-sm font-medium text-zinc-400">
                    รหัสกะ
                  </Table.Column>
                  <Table.Column className="py-2 px-2 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-zinc-400 hidden md:table-cell">
                    ชื่อกะ
                  </Table.Column>
                  <Table.Column className="py-2 px-2 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-zinc-400">
                    ผลจากข้อตกลง
                  </Table.Column>
                  <Table.Column className="py-2 px-2 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-zinc-400 max-w-[120px] md:max-w-xs truncate">
                    ลักษณะการรูดบัตร
                  </Table.Column>
                  <Table.Column className="py-2 px-2 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-zinc-400 hidden md:table-cell">
                    วิธีหัก
                  </Table.Column>
                  <Table.Column className="py-2 px-2 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-zinc-400">
                    จำนวน
                  </Table.Column>
                </Table.Header>
                <Table.Body className="divide-y divide-zinc-800">
                  {paginatedData.map((data, index) => (
                    <Table.Row
                      key={index}
                      className="bg-[#1c1c1e] hover:bg-zinc-800/60 transition-colors duration-150 cursor-pointer"
                    >
                      <Table.Cell className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm font-semibold text-white">
                        {data.date}
                      </Table.Cell>
                      <Table.Cell className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm text-zinc-300 text-center">
                        {data.shiftCode}
                      </Table.Cell>
                      <Table.Cell className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm text-zinc-300 hidden md:table-cell">
                        {data.shiftName}
                      </Table.Cell>
                      <Table.Cell className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm text-zinc-300">
                        {data.agreementResult}
                      </Table.Cell>
                      <Table.Cell className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm text-zinc-300 max-w-[120px] md:max-w-xs truncate">
                        {data.cardSwipeType}
                      </Table.Cell>
                      <Table.Cell className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm text-zinc-300 hidden md:table-cell">
                        {data.deductionMethod}
                      </Table.Cell>
                      <Table.Cell className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm text-zinc-300">
                        {data.amount}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            {/* Footer Pagination */}
            <Table.Footer>
              <div className="px-2 sm:px-6 py-2 sm:py-3 bg-[#2c2c2e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <span className="text-xs text-zinc-500">
                  {rangeStart} to {rangeEnd} of {mockData.length} results
                </span>
                <Pagination size="sm">
                  <Pagination.Content className="gap-1 flex items-center">
                    <Pagination.Item>
                      <Pagination.Previous
                        isDisabled={page === 1}
                        onPress={() => setPage((p) => Math.max(1, p - 1))}
                        className="text-xs px-2.5 py-1 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Pagination.PreviousIcon />
                        Prev
                      </Pagination.Previous>
                    </Pagination.Item>
                    {pages.map((p) => (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p === page}
                          onPress={() => setPage(p)}
                          className={cn(
                            "text-xs w-7 h-7 rounded-md flex items-center justify-center transition-colors",
                            p === page
                              ? "bg-zinc-600 text-white font-semibold"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-700",
                          )}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ))}
                    <Pagination.Item>
                      <Pagination.Next
                        isDisabled={page === totalPages}
                        onPress={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        className="text-xs px-2.5 py-1 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        Next
                        <Pagination.NextIcon />
                      </Pagination.Next>
                    </Pagination.Item>
                  </Pagination.Content>
                </Pagination>
              </div>
            </Table.Footer>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default TableComponent;
