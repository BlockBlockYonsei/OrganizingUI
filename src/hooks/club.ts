import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";
import { CreateNewClassEvent, CurrentClass } from "@/types/club-class";

export const useGetCurrentClass = () => {
  const [createNewClassEvents, setCreateNewClassEvents] =
    useState<CreateNewClassEvent[]>();
  const [currentClass, setCurrentClass] = useState<CurrentClass>();
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
        } catch (e: any) {
          setError(e);
        } finally {
          setIsPending(false);
        }
      });
  }, []);
  useEffect(() => {
    if (createNewClassEvents) {
      const sorted = createNewClassEvents.sort((a, b) => b.class - a.class);
      client
        .getObject({
          id: sorted[0].class_id,
          options: { showContent: true, showType: true },
        })
        .then((data) => {
          const content = data.data?.content;
          if (
            content &&
            "fields" in content &&
            "id" in content.fields &&
            typeof content.fields.id === "object" &&
            content.fields.id !== null &&
            "id" in content.fields.id &&
            typeof content.fields.id.id === "string" &&
            "blockblock_ys" in content.fields &&
            typeof content.fields.blockblock_ys === "string" &&
            "class" in content.fields &&
            typeof content.fields.class === "string" &&
            "members" in content.fields &&
            Array.isArray(content.fields.members) &&
            "recruitment" in content.fields
          ) {
            // if (
            //   typeof content.fields.recruitment === "object" &&
            //   content.fields.recruitment !== null &&
            //   "vec" in content.fields.recruitment
            // ) {

            // }
            const currentClass: CurrentClass = {
              id: content.fields.id.id,
              blockblock_ys: content.fields.blockblock_ys,
              class: Number(content.fields.class),
              members: content.fields.members as string[],
              recruitment: content.fields.recruitment,
            };

            setCurrentClass(currentClass);
          }
        });
    }
  }, [createNewClassEvents]);

  return {
    createNewClassEvents,
    currentClass,
    isPending,
    error,
  };
};
