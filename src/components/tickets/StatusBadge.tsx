import React from "react";
import { Check, RefreshCw, Send, X } from "lucide-react";

type TicketStatus = "sent" | "returned" | "confirmed" | "rejected";

interface StatusBadgeProps {
  status: TicketStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "sent":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2563eb] text-white">
          <Send className="mr-1 h-3 w-3" />
          Sent
        </span>
      );
    case "returned":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eab308] text-white">
          <RefreshCw className="mr-1 h-3 w-3" />
          Returned
        </span>
      );
    case "confirmed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10b981] text-white">
          <Check className="mr-1 h-3 w-3" />
          Confirmed
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ef4444] text-white">
          <X className="mr-1 h-3 w-3" />
          Rejected
        </span>
      );
    default:
      return null;
  }
};

export default StatusBadge;
