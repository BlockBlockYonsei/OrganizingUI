import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function NonMemberPage() {
  return (
    <div>
      <div className = "text-[30px]">운영진 모집</div>
      <div className = "text-[20px] mt-4">Received</div>
      <Card className="w-120 h-60 mt-10 flex justify-left">
        <CardContent className="flex justify-center items-center flex-col h-full">
          <div>
            <div className="flex justify-center items-center gap-4">
              <p className = "text-[20px]">
              Invited to {""} 
              </p>
              <div className="w-30 h-10 border-2 border-white rounded-md"></div>
            </div>
           
            
            <div className="flex justify-center items-center mt-8">
              <Button className = "text-[25px]">
                Accept
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    // <div className="flex justify-center items-center h-screen relative">
    //   <div className="absolute top-5 left-5 text-2xl font-bold text-gray-200">
    //     운영진 모집
    //   </div>
    //       <Card className="absolute top-[80px] left-[50px] w-[400px] h-[300px]">
    //         <CardContent className="flex flex-col justify-center items-center h-full">
    //           <div className="text-center mb-3">
    //             Invited to {" "}
    //             <span className="inline-block w-[150px] h-[30px] ml-2 border-2 border-white"></span>
    //           </div>
    //           <Button className="w-full">Accept</Button>
    //         </CardContent>
    //       </Card>
    // </div>
  );
}