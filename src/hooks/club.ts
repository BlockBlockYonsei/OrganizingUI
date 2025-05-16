import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";
import { CreateNewClassEvent, CurrentClass } from "@/types/club-class";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { usePresident } from "./president";
import { Transaction } from "@mysten/sui/transactions";

export const useGetCurrentClass = () => {
  const [createNewClassEvents, setCreateNewClassEvents] =
    useState<CreateNewClassEvent[]>();
  const [currentClass, setCurrentClass] = useState<CurrentClass>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const refetch = () => {
    setRefresh((prev) => !prev);
  };

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
  }, [refresh]);

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
            const newCurrentClass: CurrentClass = {
              id: content.fields.id.id,
              blockblock_ys: content.fields.blockblock_ys,
              class: Number(content.fields.class),
              members: content.fields.members as string[],
              recruitment: content.fields.recruitment
                ? {
                    fields: {
                      blockblock_ys:
                        content.fields.recruitment.fields.blockblock_ys,
                      // class: number;
                      class: content.fields.recruitment.fields.class,
                      class_id: content.fields.recruitment.fields.class_id,
                      addresses: content.fields.recruitment.fields.addresses,
                    },
                    type: content.fields.recruitment.type,
                  }
                : null,
            };

            setCurrentClass(newCurrentClass);
            console.log("REFUERLKJELFIEJS???", newCurrentClass);
          }
        });
    }
  }, [createNewClassEvents]);

  return {
    createNewClassEvents,
    currentClass,
    isPending,
    error,
    refetch,
  };
};

export function useCurrentClass() {
  // const [isPending, setIsPending] = useState<boolean>(true);
  // const [error, setError] = useState(null);
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const { currentClass, refetch } = useGetCurrentClass();
  const { currentPresidentCap } = usePresident({
    owner: account ? account.address : "",
  });

  const startClubRecruitment = () => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClass) return;
    if (!currentPresidentCap) return;

    const tx = new Transaction();

    tx.moveCall({
      package: PACKAGE_ID,
      module: "blockblock",
      function: "start_club_recruitment",
      arguments: [
        tx.object(currentClass.blockblock_ys),
        tx.object(currentClass.id),
        tx.object(currentPresidentCap.id),
      ],
    });

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: (data) => {
          console.log("Success! data:", data);
          refetch();
          // setToastState({
          //   type: "success",
          //   message: "Creating collection succeeded.",
          // });
          // setTimeout(() => {
          //   refetch();
          //   console.log("HOOORAAY");
          // }, 5000);
        },
        onError: (err) => {
          console.log("Error", err);
          // setToastState({
          //   type: "error",
          //   message:
          //     "Something went wrong while creating the collection. Please try again.",
          // });
        },
      }
    );
  };

  const endClubRecruitmentAndGrantMemberCaps = () => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClass) return;
    if (!currentPresidentCap) return;

    const tx = new Transaction();

    tx.moveCall({
      package: PACKAGE_ID,
      module: "blockblock",
      function: "end_club_recruitment_and_grant_member_caps",
      arguments: [
        tx.object(currentClass.blockblock_ys),
        tx.object(currentClass.id),
        tx.object(currentPresidentCap.id),
      ],
    });

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: (data) => {
          console.log("Success! data:", data);
          refetch();
          // setToastState({
          //   type: "success",
          //   message: "Creating collection succeeded.",
          // });
          // setTimeout(() => {
          //   refetch();
          //   console.log("HOOORAAY");
          // }, 5000);
        },
        onError: (err) => {
          console.log("Error", err);
          // setToastState({
          //   type: "error",
          //   message:
          //     "Something went wrong while creating the collection. Please try again.",
          // });
        },
      }
    );
  };
  return {
    startClubRecruitment,
    endClubRecruitmentAndGrantMemberCaps,
    // isPending,
    // error,
  };
}
