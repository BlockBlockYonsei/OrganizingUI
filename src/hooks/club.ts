import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";
import { CreateNewClassEvent } from "@/types/club-class";

export const useGetCreateNewClassEvents = () => {
  const [createNewClassEvents, setCreateNewClassEvents] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const TYPE = `${PACKAGE_ID}::club_class::CreateNewClass`;

  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  useEffect(() => {
    client
      .queryEvents({
        query: { MoveEventType: TYPE },
      })
      .then((data) => {
        try {
          const createNewClassEvents: CreateNewClassEvent[] = data.data.flatMap(
            (d) => {
              const parsedJson = d.parsedJson;
              if (
                parsedJson &&
                typeof parsedJson === "object" &&
                "blockblock_ys" in parsedJson &&
                parsedJson.blockblock_ys !== null &&
                "class_id" in parsedJson &&
                parsedJson.class_id !== null &&
                "class" in parsedJson &&
                parsedJson.class !== null
              ) {
                return [parsedJson as CreateNewClassEvent];
              }
              return [];
            }
          );
          setCreateNewClassEvents(createNewClassEvents);
          console.log("create new class events", createNewClassEvents);
        } catch (e: any) {
          setError(e);
        } finally {
          setIsPending(false);
        }
      });
  }, []);

  return {
    createNewClassEvents,
    isPending,
    error,
  };
};
