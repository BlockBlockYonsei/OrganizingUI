"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function NextRecuritingClass() {
  const [status, setStatus] = useState<"open" | "close">("close");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressList, setAddressList] = useState<string[]>([]);

  const handleSend = () => {
    if (selectedAddress && !addressList.includes(selectedAddress)) {
      setAddressList((prev) => [...prev, selectedAddress]);
    }
  };

  const handleToggle = () => {
    setStatus((prev) => (prev === "open" ? "close" : "open"));
  };

  return (
    <div className="p-6 space-y-6 text-white">
      <h2 className="text-2xl font-bold">Recuriting</h2>

      <div className="flex items-center gap-4">
        <span>registration</span>

        {/* 커스텀 스위치 버튼 */}
        <div
          onClick={handleToggle}
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

        <span className="text-sm">
          {status === "open" ? <span className="text-green-400">open</span> : <span className="text-orange-400">close</span>}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Select onValueChange={setSelectedAddress}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select address" />
          </SelectTrigger>
          <SelectContent className="text-white bg-gray-900">
            <SelectItem value="address1">address1</SelectItem>
            <SelectItem value="address2">address2</SelectItem>
            <SelectItem value="address3">address3</SelectItem>
            <SelectItem value="address4">address4</SelectItem>
            <SelectItem value="address5">address5</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSend} className="bg-blue-500 text-white hover:bg-blue-600">
          Send
        </Button>
      </div>

      <ul className="list-disc pl-5 space-y-1">
        {addressList.map((addr, idx) => (
          <li key={idx}>{addr}</li>
        ))}
      </ul>
    </div>
  );
}
