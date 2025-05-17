import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";
import { useCurrentClub } from "./club";
import { ExecutiveMemberTicket } from "@/types/tickets";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export const useExecutiveMemberTicket = () => {
  const [tickets, setTickets] = useState<ExecutiveMemberTicket[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${PACKAGE_ID}::executive_member::ExecutiveMemberTicket`;

  const account = useCurrentAccount();
  const { currentClub } = useCurrentClub();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  useEffect(() => {
    if (!account) return;
    if (!currentClub) return;

    client
      .getOwnedObjects({
        owner: account.address,
        filter: { StructType: CAP_TYPE },
        options: {
          showType: true,
          showContent: true,
        },
      })
      .then((data) => {
        const currentClubExecutiveMemberTickets = data.data.flatMap((d) => {
          const content = d.data?.content;
          if (
            content &&
            "fields" in content &&
            "club_class" in content.fields &&
            typeof content.fields.club_class === "string" &&
            "id" in content.fields &&
            typeof content.fields.id === "object" &&
            content.fields.id !== null &&
            "id" in content.fields.id &&
            typeof content.fields.id.id === "string" &&
            "member_type" in content.fields &&
            typeof content.fields.member_type === "string" &&
            "president" in content.fields &&
            typeof content.fields.president === "string" &&
            "member_address" in content.fields
          ) {
            const executiveMemberTicket: ExecutiveMemberTicket = {
              id: content.fields.id.id,
              club_class: Number(content.fields.club_class),
              member_type: content.fields.member_type,
              president: content.fields.president,
              member_address:
                content.fields.member_address &&
                typeof content.fields.member_address === "string"
                  ? content.fields.member_address
                  : null,
            };

            if (executiveMemberTicket.club_class === currentClub.class) {
              return executiveMemberTicket;
            }
          }
          return [];
        });
        console.log(
          "currentClubExecutiveMemberTickets",
          currentClubExecutiveMemberTickets
        );
        setTickets(currentClubExecutiveMemberTickets);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [account, currentClub]);

  const sendBackExecutiveMemberTicket = ({
    ticket,
  }: {
    ticket: ExecutiveMemberTicket;
  }) => {
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
      function: "send_back_executive_member_ticket",
      typeArguments: [`${PACKAGE_ID}::executive_member::${ticket.member_type}`],
      arguments: [
        tx.object(currentClub.blockblock_ys),
        tx.object(currentClub.id),
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
    tickets,
    isPending,
    error,
    sendBackExecutiveMemberTicket,
  };
};
