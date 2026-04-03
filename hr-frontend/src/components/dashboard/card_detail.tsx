"use client";

import React from "react";
import { Card } from "@heroui/react";

// icons
import { TbCalendar, TbExternalLink, TbListDetails } from "react-icons/tb";

function CardDetailComponent() {
  return (
    <div className="w-full rounded-2xl border border-zinc-700/50 mb-8">
      <div className="flex justify-between">
        <div className="grid grid-cols-2 gap-4 p-6">
          <Card className="w-[320px] text-gray-800 shadow-lg shadow-gray-400 p-4 rounded-2xl">
            <Card.Header>
              <Card.Title>ลาป่วย(มีใบรับรองแพทย์)</Card.Title>
              <Card.Description>
                โควต้าการลาป่วยที่เหลือ: 5 วัน
              </Card.Description>
            </Card.Header>
            <Card.Content>ใช้สิทธิ์ลาป่วยไปแล้ว 2 วัน</Card.Content>
            <hr className="my-4 border-zinc-700" />
            <Card.Footer className="flex items-center hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                รายละเอียด
                <TbExternalLink className="inline-block ml-2" />
            </Card.Footer>
          </Card>

          <Card className="w-[320px] text-gray-800 shadow-lg shadow-gray-400 p-4 rounded-2xl">
            <Card.Header>
              <Card.Title>ลาป่วย(ไม่มีใบรับรองแพทย์)</Card.Title>
              <Card.Description>
                โควต้าการลาป่วยที่เหลือ: 5 วัน
              </Card.Description>
            </Card.Header>
            <Card.Content>ใช้สิทธิ์ลาป่วยไปแล้ว 2 วัน</Card.Content>
            <hr className="my-4 border-zinc-700" />
            <Card.Footer className="flex items-center hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                รายละเอียด
                <TbExternalLink className="inline-block ml-2" />
            </Card.Footer>
          </Card>

          <Card className="w-[320px] text-gray-800 shadow-lg shadow-gray-400 p-4 rounded-2xl">
            <Card.Header>
              <Card.Title>ลากิจ</Card.Title>
              <Card.Description>
                โควต้าการลากิจที่เหลือ: 5 วัน
              </Card.Description>
            </Card.Header>
            <Card.Content>ใช้สิทธิ์ลากิจไปแล้ว 2 วัน</Card.Content>
            <hr className="my-4 border-zinc-700" />
            <Card.Footer className="flex items-center hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                รายละเอียด
                <TbExternalLink className="inline-block ml-2" />
            </Card.Footer>
          </Card>

          <Card className="w-[320px] text-gray-800 shadow-lg shadow-gray-400 p-4 rounded-2xl">
            <Card.Header>
              <Card.Title>ลาพักร้อน</Card.Title>
              <Card.Description>
                โควต้าการลาพักร้อนที่เหลือ: 5 วัน
              </Card.Description>
            </Card.Header>
            <Card.Content>ใช้สิทธิ์ลาพักร้อนไปแล้ว 2 วัน</Card.Content>
            <hr className="my-4 border-zinc-700" />
            <Card.Footer className="flex items-center hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                รายละเอียด
                <TbExternalLink className="inline-block ml-2" />
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CardDetailComponent;
