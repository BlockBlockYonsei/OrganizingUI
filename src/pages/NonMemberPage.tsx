import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function NonMemberPage() {
  return (
    <div>
      <div className="text-3xl font-bold">Executive Member Ticket</div>

      <br />

      <Card className="w-120 py-15">
        <CardContent className="flex justify-center items-center flex-col space-y-10">
          <div>
            <div className="flex justify-center items-center gap-4">
              <span className="text-2xl">Invited as </span>
              <span className="p-2 text-2xl border-2 rounded-md text-center">
                {`Blockblock ${"President"}`}
              </span>
            </div>
          </div>
          <Button className="text-2xl border-2 rounded-md py-5 active:bg-gray-700 cursor-pointer">
            Accept
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
