import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";
import { useGetCurrentClass } from "./club";
import { ExecutiveMember } from "@/types/members";
import { ExecutiveMemberTicket } from "@/types/tickets";
import { useCurrentAccount } from "@mysten/dapp-kit";

export const useGetExecutiveMemberTicket = () => {
  const [tickets, setTickets] = useState<ExecutiveMemberTicket[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${PACKAGE_ID}::executive_member::ExecutiveMemberTicket`;

  const account = useCurrentAccount();
  const { currentClass } = useGetCurrentClass();

  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  useEffect(() => {
    if (!account) return;
    if (!currentClass) return;

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
        const currentClassExecutiveMemberTickets = data.data.flatMap((d) => {
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
              member_address: content.fields.member_address,
            };

            if (executiveMemberTicket.club_class === currentClass.class) {
              return executiveMemberTicket;
            }
          }
          return [];
        });
        console.log(
          "currentClassExecutiveMemberTickets",
          currentClassExecutiveMemberTickets
        );
        setTickets(currentClassExecutiveMemberTickets);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [account, currentClass]);

  return {
    tickets,
    isPending,
    error,
  };
};
