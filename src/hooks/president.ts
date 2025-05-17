import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentClub, usePastClub } from "./club";
import { ORIGINAL_PACKAGE_ID, UPGRADED_PACKAGE_ID } from "@/Constant";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { ExecutiveMember, ExecutiveMemberType } from "@/types/members";
import { ExecutiveMemberTicket } from "@/types/tickets";

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
  const client = new SuiClient({ url: getFullnodeUrl("testnet") });

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
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClub) return;
    if (!currentPresidentCap) return;

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
    if (!currentClub) return;
    if (!currentPresidentCap) return;

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

  const startClubRecruitment = () => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClub) return;
    if (!currentPresidentCap) return;

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

  const endClubRecruitmentAndGrantMemberCaps = () => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClub) return;
    if (!currentPresidentCap) return;

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

  const initiateClassTransition = () => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClub) return;
    if (!currentPresidentCap) return;

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

  const appointPresident = ({ recipient }: { recipient: string }) => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClub) return;
    if (!previousClub) return;
    if (!previousPresidentCap) return;

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
          console.log("Success! data:", data);
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
    previousPresidentCap,
    inviteExecutiveMember,
    confirmExecutiveMemberTicket,
    startClubRecruitment,
    endClubRecruitmentAndGrantMemberCaps,
    initiateClassTransition,
    appointPresident,
    isPending,
    error,
  };
}
