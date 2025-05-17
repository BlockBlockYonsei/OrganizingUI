import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { ORIGINAL_PACKAGE_ID, UPGRADED_PACKAGE_ID } from "@/Constant";
import {
  NewClassCreated,
  CurrentClub,
  PastClub,
  CurrentClassDeletedAndPastClassCreated,
} from "@/types/club";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { ExecutiveMember, ExecutiveMemberType } from "@/types/members";
import { parseDynamicBaseTypeField } from "@/lib/sui-client";
import { toast } from "sonner";

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

  const TYPE = `${ORIGINAL_PACKAGE_ID}::club_class::NewClassCreated`;
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
                  `${ORIGINAL_PACKAGE_ID}::club_class::ExecutiveMemberKey<${ORIGINAL_PACKAGE_ID}::executive_member::`
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

            const finalizer = parsedDFData
              .filter((d) =>
                d.content.fields.name.type.includes(
                  `${ORIGINAL_PACKAGE_ID}::club_class::FinalizingCurrentClubKey<${ORIGINAL_PACKAGE_ID}::executive_member::`
                )
              )
              .flatMap((d) => {
                const regex = /::executive_member::([^>]+)>/;
                const match = d.content.fields.name.type.match(regex);
                if (!match) return [];
                return [match[1]];
              });

            const isFinalized = {
              president: finalizer.includes("President"),
              vice_president: finalizer.includes("VicePresident"),
              treasurer: finalizer.includes("Treasurer"),
            };

            const newCurrentClub: CurrentClub = {
              id: content.fields.id.id,
              blockblock_ys: content.fields.blockblock_ys,
              class: Number(content.fields.class),
              members: content.fields.members as string[],
              dynamicFieldData: parsedDFData,
              executive_members: executiveMembers,
              is_finalized: isFinalized,
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
            };

            // console.log("new cururune", newCurrentClub);

            setCurrentClub(newCurrentClub);
          }
        });
    }
  }, [NewClassCreatedEvents]);

  const applyToJoinClub = () => {
    if (!account) return;
    if (!currentClub) return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
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
          toast.dismiss();
          toast.success(`Success! digest: ${data.digest}`);
          refetch();
        },
        onError: (err) => {
          toast.dismiss();
          toast.error(`Error: ${err}`);
        },
      }
    );
  };

  const finalizeCurrentClass = ({ cap }: { cap: ExecutiveMember }) => {
    if (!account) return;
    if (!currentClub) return;

    if (
      !(
        ["President", "VicePresident", "Treasurer"] as ExecutiveMemberType[]
      ).includes(cap.member_type as ExecutiveMemberType)
    )
      return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: "blockblock",
      function: "finalize_current_class",
      typeArguments: [
        `${ORIGINAL_PACKAGE_ID}::executive_member::${cap.member_type}`,
      ],
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
          toast.dismiss();
          toast.success(`Success! digest: ${data.digest}`);
          refetch();
        },
        onError: (err) => {
          toast.dismiss();
          toast.error(`Error: ${err}`);
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

export function usePastClub() {
  const [pastClassCreatedEvents, setPastClassCreatedEvents] =
    useState<CurrentClassDeletedAndPastClassCreated[]>();
  const [previousClub, setRecentPastClub] = useState<PastClub>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const refetch = () => {
    setRefresh((prev) => !prev);
  };

  const TYPE = `${ORIGINAL_PACKAGE_ID}::club_class::CurrentClassDeletedAndPastClassCreated`;
  const client = new SuiClient({ url: getFullnodeUrl("testnet") });

  useEffect(() => {
    client
      .queryEvents({
        query: { MoveEventType: TYPE },
      })
      .then((data) => {
        try {
          const pastClassCreatedEvents: CurrentClassDeletedAndPastClassCreated[] =
            data.data.flatMap((d) => {
              const parsedJson = d.parsedJson;
              if (
                parsedJson &&
                typeof parsedJson === "object" &&
                "blockblock_ys" in parsedJson &&
                parsedJson.blockblock_ys !== null &&
                "past_class_id" in parsedJson &&
                parsedJson.past_class_id !== null &&
                "class" in parsedJson &&
                parsedJson.class !== null
              ) {
                return [parsedJson as CurrentClassDeletedAndPastClassCreated];
              }
              return [];
            });
          setPastClassCreatedEvents(pastClassCreatedEvents);
        } catch (e: any) {
          setError(e);
        } finally {
          setIsPending(false);
        }
      });
  }, [refresh]);

  useEffect(() => {
    if (pastClassCreatedEvents) {
      const sorted = pastClassCreatedEvents.sort((a, b) => b.class - a.class);

      client
        .getObject({
          id: sorted[0].past_class_id,
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
            Array.isArray(content.fields.members)
          ) {
            const executiveMembers = parsedDFData
              .filter((d) =>
                d.content.fields.name.type.includes(
                  `${ORIGINAL_PACKAGE_ID}::club_class::ExecutiveMemberKey<${ORIGINAL_PACKAGE_ID}::executive_member::`
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

            const pastClub: PastClub = {
              id: content.fields.id.id,
              blockblock_ys: content.fields.blockblock_ys,
              class: Number(content.fields.class),
              members: content.fields.members as string[],
              dynamicFieldData: parsedDFData,
              executive_members: executiveMembers,
            };

            console.log("new previousClub", pastClub);

            setRecentPastClub(pastClub);
          }
        });
    }
  }, [pastClassCreatedEvents]);

  return {
    pastClassCreatedEvents,
    previousClub,
    isPending,
    error,
    refetch,
  };
}
