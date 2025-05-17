import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { ORIGINAL_PACKAGE_ID } from "@/Constant";
import { useCurrentClub, usePastClub } from "./club";
import { BlockblockMember, ExecutiveMember } from "@/types/members";

export const useGetExecutiveMemberCap = ({ owner }: { owner: string }) => {
  const [currentClubExecutiveMemberCaps, setCurrentClubExecutiveMemberCaps] =
    useState<ExecutiveMember[]>([]);
  const [
    previousClubExecutiveMemberCaps,
    setRecentPastClubExecutiveMemberCaps,
  ] = useState<ExecutiveMember[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${ORIGINAL_PACKAGE_ID}::executive_member::ExecutiveMemberCap`;

  const { currentClub } = useCurrentClub();
  const { previousClub } = usePastClub();

  const client = new SuiClient({ url: "https://rpc-testnet.suiscan.xyz:443" });
  useEffect(() => {
    if (!owner) return;
    if (!currentClub) return;

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
        const currentClubExecutiveMemberCaps = data.data.flatMap((d) => {
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
            typeof content.fields.member_type === "string"
          ) {
            const executiveMember: ExecutiveMember = {
              id: content.fields.id.id,
              club_class: Number(content.fields.club_class),
              member_type: content.fields.member_type,
            };

            if (executiveMember.club_class === currentClub.class) {
              return executiveMember;
            }
          }
          return [];
        });
        setCurrentClubExecutiveMemberCaps(currentClubExecutiveMemberCaps);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner, currentClub]);

  useEffect(() => {
    if (!owner) return;
    if (!previousClub) return;

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
        const previousClubExecutiveMemberCaps = data.data.flatMap((d) => {
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
            typeof content.fields.member_type === "string"
          ) {
            const executiveMember: ExecutiveMember = {
              id: content.fields.id.id,
              club_class: Number(content.fields.club_class),
              member_type: content.fields.member_type,
            };

            if (executiveMember.club_class === previousClub.class) {
              return executiveMember;
            }
          }
          return [];
        });
        setRecentPastClubExecutiveMemberCaps(previousClubExecutiveMemberCaps);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner, previousClub]);

  return {
    currentClubExecutiveMemberCaps,
    previousClubExecutiveMemberCaps,
    isPending,
    error,
  };
};

export const useGetMemberCap = ({ owner }: { owner: string }) => {
  const [currentMemberCap, setCurrentMemberCap] = useState<BlockblockMember>();
  const [caps, setCaps] = useState<BlockblockMember[]>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${ORIGINAL_PACKAGE_ID}::blockblock_member::BlockblockMemberCap`;

  const { currentClub } = useCurrentClub();
  const client = new SuiClient({ url: "https://rpc-testnet.suiscan.xyz:443" });

  useEffect(() => {
    if (!owner) return;
    if (!currentClub) return;

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
        // CurrentClub 로 한 번 필터링 해주  면 좋겠 다
        // MemberCap은... 일단 다 가져와 되긴 할 듯?
        const currentClubBlockblockMemberCaps = data.data.flatMap((d) => {
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
            typeof content.fields.id.id === "string"
          ) {
            const blockblockMember: BlockblockMember = {
              id: content.fields.id.id,
              club_class: Number(content.fields.club_class),
            };

            return blockblockMember;
          }
          return [];
        });
        setCaps(currentClubBlockblockMemberCaps);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner, currentClub]);

  useEffect(() => {
    if (!caps) return;

    caps.sort((a, b) => b.club_class - a.club_class);
    setCurrentMemberCap(caps[0]);
  }, [caps]);

  return {
    currentMemberCap,
    caps,
    isPending,
    error,
  };
};
