import { useEffect, useState } from "react";
import { useClubRecruiting, useCurrentClub } from "@/hooks/club";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

export default function CurrentClubRecruiting() {
  // const [status, setStatus] = useState<"open" | "close">("close");
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const { currentClub } = useCurrentClub();
  const { startClubRecruitment, endClubRecruitmentAndGrantMemberCaps } =
    useClubRecruiting();

  useEffect(() => {
    console.log("currenecltREFSLEFJ??", updateTrigger, currentClub);
  }, [updateTrigger]);

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-bold">Recuriting</h2>

      {/* <div className="flex items-center gap-4"> */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4 min-w-lg">
          <Accordion type="multiple">
            <AccordionItem
              value="item1"
              className="border-2 last:border-b-2 rounded-lg px-2"
            >
              <AccordionTrigger className="text-md">
                Member Addresses
              </AccordionTrigger>
              {currentClub &&
                currentClub.members.map((address) => (
                  <AccordionContent>{address}</AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
        </div>

        {currentClub && (
          <div className="col-span-2 h-full flex items-start">
            <div className=" min-w-40 flex justify-center items-center gap-2">
              {/* 커스텀 스위치 버튼 */}
              <div
                onClick={() => {
                  if (!currentClub) return;

                  if (currentClub.recruitment === null) {
                    startClubRecruitment();
                  } else {
                    endClubRecruitmentAndGrantMemberCaps();
                  }

                  setUpdateTrigger((prev) => !prev);
                }}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  currentClub.recruitment !== null
                    ? "bg-green-500"
                    : "bg-orange-500"
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    currentClub.recruitment !== null
                      ? "translate-x-6"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <span>Registration</span>
                <span className="text-sm">
                  {currentClub.recruitment !== null ? (
                    <span className="text-green-400">Open</span>
                  ) : (
                    <span className="text-orange-400">Close</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
