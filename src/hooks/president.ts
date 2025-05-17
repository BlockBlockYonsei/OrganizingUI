import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentClass } from "./club";
import { PACKAGE_ID } from "@/Constant";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { ExecutiveMember, ExecutiveMemberType } from "@/types/members";
import { ExecutiveMemberTicket } from "@/types/tickets";

export function usePresident({ owner }: { owner: string }) {
  const [currentPresidentCap, setCurrentPresidentCap] =
    useState<ExecutiveMember>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const { currentClass } = useCurrentClass();

  const CAP_TYPE = `${PACKAGE_ID}::executive_member::ExecutiveMemberCap`;

  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  useEffect(() => {
    client
      .getOwnedObjects({
        owner,
        filter: { StructType: CAP_TYPE },
        options: {
          showType: true,
          showContent: true,
        },
      })
      .then((data) => {
        try {
          const excutiveMembers: ExecutiveMember[] = data.data.flatMap((d) => {
            // const content = data.data?.content;
            const content = d.data?.content;
            if (
              content &&
              "fields" in content &&
              "club_class" in content.fields &&
              typeof content.fields.club_class === "string" &&
              "member_type" in content.fields &&
              typeof content.fields.member_type === "string" &&
              "id" in content.fields &&
              typeof content.fields.id === "object" &&
              content.fields.id !== null &&
              "id" in content.fields.id &&
              typeof content.fields.id.id === "string"
            ) {
              const excutiveMember: ExecutiveMember = {
                id: content.fields.id.id,
                club_class: Number(content.fields.club_class),
                member_type: content.fields.member_type,
              };
              return [excutiveMember as ExecutiveMember];
            }
            return [];
          });

          if (currentClass) {
            const currentPresident = excutiveMembers
              .filter((e) => e.club_class === currentClass.class)
              .filter((e) => e.member_type === "President");

            if (currentPresident) {
              setCurrentPresidentCap(currentPresident[0]);
            }
          }
        } catch (e: any) {
          setError(e);
        } finally {
          setIsPending(false);
        }
        // CurrentClass 로 한 번 필터링 해주  면 좋겠 다
        // setPresidentCap(data);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner, currentClass]);

  const inviteExecutiveMember = ({
    recipient,
    excutiveMemberType,
  }: {
    recipient: string;
    excutiveMemberType: ExecutiveMemberType;
  }) => {
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
      function: "invite_executive_member",
      typeArguments: [`${PACKAGE_ID}::executive_member::${excutiveMemberType}`],
      arguments: [
        tx.object(currentClass.blockblock_ys),
        tx.object(currentClass.id),
        tx.object(currentPresidentCap.id),
        tx.pure.address(recipient),
      ],
    });

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: (data) => {
          console.log("Success! data:", data);
          // refetch();
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

  const confirmExecutiveMemberTicket = ({
    ticket,
  }: {
    ticket: ExecutiveMemberTicket;
  }) => {
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
      function: "confirm_executive_member_ticket",
      typeArguments: [`${PACKAGE_ID}::executive_member::${ticket.member_type}`],
      arguments: [
        tx.object(currentClass.blockblock_ys),
        tx.object(currentClass.id),
        tx.object(currentPresidentCap.id),
        tx.object(ticket.id),
      ],
    });

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: (data) => {
          console.log("Success! data:", data);
          // refetch();
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
    currentPresidentCap,
    inviteExecutiveMember,
    confirmExecutiveMemberTicket,
    isPending,
    error,
  };
}
