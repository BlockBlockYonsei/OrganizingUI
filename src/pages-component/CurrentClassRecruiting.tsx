"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CurrentClassRecruiting() {
  const [status, setStatus] = useState<"open" | "close">("close");
  // const [selectedAddress, setSelectedAddress] = useState("");

  const memberAddresses = [
    "0x00000address1",
    "0x00000address2",
    "0x00000address3",
    "0x00000address4",
    "0x00000address5",
    "0x00000address6",
  ];

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-bold">Recuriting</h2>

      <div className="flex items-center gap-4">
        <div className="min-w-lg">
          <Select onValueChange={() => {}}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Registerd Member Address" />
            </SelectTrigger>
            <SelectContent className="text-white bg-gray-900">
              {memberAddresses.map((a) => (
                <SelectItem value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-center items-center gap-4">
            {/* 커스텀 스위치 버튼 */}
            <div
              onClick={() => {
                setStatus((prev) => (prev === "open" ? "close" : "open"));
              }}
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                status === "open" ? "bg-green-500" : "bg-orange-500"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  status === "open" ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <span>Registration</span>
              <span className="text-sm">
                {status === "open" ? (
                  <span className="text-green-400">Open</span>
                ) : (
                  <span className="text-orange-400">Close</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
