import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";
import { NewClassCreated, CurrentClub } from "@/types/club-class";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { ExecutiveMember, ExecutiveMemberType } from "@/types/members";
import { parseDynamicBaseTypeField } from "@/lib/sui-client";

export function useCurrentClub() {
  const [NewClassCreatedEvents, setNewClassCreatedEvents] =
    useState<NewClassCreated[]>();
  const [currentClub, setCurrentClub] = useState<CurrentClub>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const refetch = () => {
    setRefresh((prev) => !prev);
  };

  const TYPE = `${PACKAGE_ID}::club_class::NewClassCreated`;
  const client = new SuiClient({ url: getFullnodeUrl("testnet") });

  useEffect(() => {
    client
      .queryEvents({
        query: { MoveEventType: TYPE },
      })
      .then((data) => {
        try {
          const NewClassCreatedEvents: NewClassCreated[] = data.data.flatMap(
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
                return [parsedJson as NewClassCreated];
              }
              return [];
            }
          );
          setNewClassCreatedEvents(NewClassCreatedEvents);
        } catch (e: any) {
          setError(e);
        } finally {
          setIsPending(false);
        }
      });
  }, [refresh]);

  useEffect(() => {
    if (NewClassCreatedEvents) {
      const sorted = NewClassCreatedEvents.sort((a, b) => b.class - a.class);

      client
        .getObject({
          id: sorted[0].class_id,
          options: { showContent: true, showType: true },
        })
        .then(async (data) => {
          const content = data.data?.content;
          if (
            content &&
            "fields" in content &&
            "id" in content.fields &&
            typeof content.fields.id === "object" &&
            content.fields.id !== null &&
            "id" in content.fields.id &&
            typeof content.fields.id.id === "string"
          ) {
            const parsedDFData = await client
              .getDynamicFields({ parentId: content.fields.id.id })
              .then((data) => {
                const dynamicFieldObjectIds = data.data.map((d) => {
                  return d.objectId;
                });

                return client.multiGetObjects({
                  ids: dynamicFieldObjectIds,
                  options: { showContent: true, showType: true },
                });
              })
              .then((data) => {
                const parsedDynamicFieldDatas = data
                  .map((d) => {
                    if (!d.data) return null;
                    return parseDynamicBaseTypeField(d.data);
                  })
                  .flatMap((d) => (d ? [d] : []));
                return parsedDynamicFieldDatas;
              });

            return { content: content, parsedDFData };
          }

          return { content: content, parsedDFData: [] };
        })
        .then(({ content, parsedDFData }) => {
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
            const executiveMembers = parsedDFData
              .filter((d) =>
                d.content.fields.name.type.includes(
                  `${PACKAGE_ID}::club_class::ExecutiveMemberKey<${PACKAGE_ID}::executive_member::`
                )
              )
              .map((d) => {
                const regex = /::executive_member::([^>]+)>/;
                const match = d.content.fields.name.type.match(regex);
                return {
                  address: d.content.fields.value,
                  member_type: match ? match[1] : "UnKnown",
                };
              });

            const newCurrentClub: CurrentClub = {
              id: content.fields.id.id,
              blockblock_ys: content.fields.blockblock_ys,
              class: Number(content.fields.class),
              members: content.fields.members as string[],
              dynamicFieldData: parsedDFData,
              executive_members: executiveMembers,
              recruitment:
                content.fields.recruitment &&
                typeof content.fields.recruitment === "object" &&
                "type" in content.fields.recruitment &&
                typeof content.fields.recruitment.type === "string" &&
                "fields" in content.fields.recruitment &&
                typeof content.fields.recruitment.fields === "object" &&
                content.fields.recruitment.fields !== null &&
                "blockblock_ys" in content.fields.recruitment.fields &&
                typeof content.fields.recruitment.fields.blockblock_ys ===
                  "string" &&
                "class" in content.fields.recruitment.fields &&
                typeof content.fields.recruitment.fields.class === "string" &&
                "class_id" in content.fields.recruitment.fields &&
                typeof content.fields.recruitment.fields.class_id ===
                  "string" &&
                "addresses" in content.fields.recruitment.fields &&
                Array.isArray(content.fields.recruitment.fields.addresses)
                  ? {
                      blockblock_ys:
                        content.fields.recruitment.fields.blockblock_ys,
                      class: Number(content.fields.recruitment.fields.class),
                      class_id: content.fields.recruitment.fields.class_id,
                      addresses: content.fields.recruitment.fields
                        .addresses as string[],
                    }
                  : null,
              // ? {
              //     fields: {
              //       blockblock_ys:
              //         content.fields.recruitment.fields.blockblock_ys,
              //       // class: number;
              //       class: content.fields.recruitment.fields.class,
              //       class_id: content.fields.recruitment.fields.class_id,
              //       addresses: content.fields.recruitment.fields.addresses,
              //     },
              //     type: content.fields.recruitment.type,
              //   }
              // : null,
            };

            console.log("new cururune", newCurrentClub);

            setCurrentClub(newCurrentClub);
          }
        });
    }
  }, [NewClassCreatedEvents]);

  const applyToJoinClub = () => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClub) return;

    const tx = new Transaction();

    tx.moveCall({
      package: PACKAGE_ID,
      module: "blockblock",
      function: "apply_to_join_club",
      arguments: [
        tx.object(currentClub.blockblock_ys),
        tx.object(currentClub.id),
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

  const finalizeCurrentClass = ({ cap }: { cap: ExecutiveMember }) => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClub) return;
    if (
      !(
        ["President", "VicePresident", "Treasurer"] as ExecutiveMemberType[]
      ).includes(cap.member_type as ExecutiveMemberType)
    )
      return;

    const tx = new Transaction();

    tx.moveCall({
      package: PACKAGE_ID,
      module: "blockblock",
      function: "finalize_current_class",
      typeArguments: [`${PACKAGE_ID}::executive_member::${cap.member_type}`],
      arguments: [
        tx.object(currentClub.blockblock_ys),
        tx.object(currentClub.id),
        tx.object(cap.id),
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
    NewClassCreatedEvents,
    currentClub,
    isPending,
    error,
    refetch,
    applyToJoinClub,
    finalizeCurrentClass,
  };
}
