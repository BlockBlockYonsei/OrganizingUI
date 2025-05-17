import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentClub, usePastClub } from "./club";
import { ORIGINAL_PACKAGE_ID, UPGRADED_PACKAGE_ID } from "@/Constant";
import { SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { ExecutiveMember, ExecutiveMemberType } from "@/types/members";
import { ExecutiveMemberTicket } from "@/types/tickets";
import { toast } from "sonner";

export function usePresident() {
  const [currentPresidentCap, setCurrentPresidentCap] =
    useState<ExecutiveMember>();
  const [previousPresidentCap, setPreviousPresidentCap] =
    useState<ExecutiveMember>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const { currentClub, refetch } = useCurrentClub();
  const { previousClub } = usePastClub();

  const CAP_TYPE = `${ORIGINAL_PACKAGE_ID}::executive_member::ExecutiveMemberCap`;
  // const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  const client = new SuiClient({ url: "https://rpc-testnet.suiscan.xyz:443" });

  useEffect(() => {
    client
      .getOwnedObjects({
        owner: account ? account.address : "",
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

          if (currentClub) {
            const currentPresident = excutiveMembers
              .filter((e) => e.club_class === currentClub.class)
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
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [currentClub]);

  useEffect(() => {
    client
      .getOwnedObjects({
        owner: account ? account.address : "",
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

          if (previousClub) {
            const previousPresident = excutiveMembers
              .filter((e) => e.club_class === previousClub.class)
              .filter((e) => e.member_type === "President");

            if (previousPresident) {
              setPreviousPresidentCap(previousPresident[0]);
            }
          }
        } catch (e: any) {
          setError(e);
        } finally {
          setIsPending(false);
        }
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [previousClub]);

  const inviteExecutiveMember = ({
    recipient,
    excutiveMemberType,
  }: {
    recipient: string;
    excutiveMemberType: ExecutiveMemberType;
  }) => {
    if (!account) return;
    if (!currentClub) return;
    if (!currentPresidentCap) return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: "blockblock",
      function: "invite_executive_member",
      typeArguments: [
        `${ORIGINAL_PACKAGE_ID}::executive_member::${excutiveMemberType}`,
      ],
      arguments: [
        tx.object(currentClub.blockblock_ys),
        tx.object(currentClub.id),
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

  const confirmExecutiveMemberTicket = ({
    ticket,
  }: {
    ticket: ExecutiveMemberTicket;
  }) => {
    if (!account) return;
    if (!currentClub) return;
    if (!currentPresidentCap) return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: "blockblock",
      function: "confirm_executive_member_ticket",
      typeArguments: [
        `${ORIGINAL_PACKAGE_ID}::executive_member::${ticket.member_type}`,
      ],
      arguments: [
        tx.object(currentClub.blockblock_ys),
        tx.object(currentClub.id),
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

  const startClubRecruitment = () => {
    if (!account) return;
    if (!currentClub) return;
    if (!currentPresidentCap) return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: "blockblock",
      function: "start_club_recruitment",
      arguments: [
        tx.object(currentClub.blockblock_ys),
        tx.object(currentClub.id),
        tx.object(currentPresidentCap.id),
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

  const endClubRecruitmentAndGrantMemberCaps = () => {
    if (!account) return;
    if (!currentClub) return;
    if (!currentPresidentCap) return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: "blockblock",
      function: "end_club_recruitment_and_grant_member_caps",
      arguments: [
        tx.object(currentClub.blockblock_ys),
        tx.object(currentClub.id),
        tx.object(currentPresidentCap.id),
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

  const initiateClassTransition = () => {
    if (!account) return;
    if (!currentClub) return;
    if (!currentPresidentCap) return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: "blockblock",
      function: "initiate_class_transition",
      arguments: [
        tx.object(currentClub.blockblock_ys),
        tx.object(currentClub.id),
        tx.object(currentPresidentCap.id),
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

  const appointPresident = ({ recipient }: { recipient: string }) => {
    if (!account) return;
    if (!currentClub) return;
    if (!previousClub) return;
    if (!previousPresidentCap) return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: "blockblock",
      function: "appoint_president",
      arguments: [
        tx.object(previousClub.blockblock_ys),
        tx.object(previousClub.id),
        tx.object(currentClub.id),
        tx.object(previousPresidentCap.id),
        tx.pure.address(recipient),
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

  const confirmPresidentTicket = ({
    ticket,
  }: {
    ticket: ExecutiveMemberTicket;
  }) => {
    if (!account) return;
    if (!currentClub) return;
    if (!previousClub) return;
    if (!previousPresidentCap) return;

    toast.dismiss();
    toast.loading("Loading...");

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: "blockblock",
      function: "confirm_president_ticket",
      arguments: [
        tx.object(previousClub.blockblock_ys),
        tx.object(previousClub.id),
        tx.object(currentClub.id),
        tx.object(previousPresidentCap.id),
        tx.object(ticket.id),
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
    currentPresidentCap,
    previousPresidentCap,
    inviteExecutiveMember,
    confirmExecutiveMemberTicket,
    startClubRecruitment,
    endClubRecruitmentAndGrantMemberCaps,
    initiateClassTransition,
    appointPresident,
    confirmPresidentTicket,
    isPending,
    error,
  };
}
