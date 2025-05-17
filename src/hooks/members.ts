import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";
import { useCurrentClass } from "./club";
import { BlockblockMember, ExecutiveMember } from "@/types/members";

export const useGetExecutiveMemberCap = ({ owner }: { owner: string }) => {
  const [caps, setCaps] = useState<ExecutiveMember[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${PACKAGE_ID}::executive_member::ExecutiveMemberCap`;

  const { currentClass } = useCurrentClass();

  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  useEffect(() => {
    if (!owner) return;
    if (!currentClass) return;

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
        const currentClassExecutiveMemberCaps = data.data.flatMap((d) => {
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

            if (executiveMember.club_class === currentClass.class) {
              return executiveMember;
            }
          }
          return [];
        });
        setCaps(currentClassExecutiveMemberCaps);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner, currentClass]);

  return {
    caps,
    isPending,
    error,
  };
};

export const useGetMemberCap = ({ owner }: { owner: string }) => {
  const [currentClassMemberCap, setCurrentClassMemberCap] =
    useState<BlockblockMember>();
  const [caps, setCaps] = useState<BlockblockMember[]>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${PACKAGE_ID}::blockblock_member::BlockblockMemberCap`;

  const { currentClass } = useCurrentClass();
  const client = new SuiClient({ url: getFullnodeUrl("testnet") });

  useEffect(() => {
    if (!owner) return;
    if (!currentClass) return;

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
        // CurrentClass 로 한 번 필터링 해주  면 좋겠 다
        // MemberCap은... 일단 다 가져와 되긴 할 듯?
        const currentClassBlockblockMemberCaps = data.data.flatMap((d) => {
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
        console.log("BLCOBLOCMAEM", currentClassBlockblockMemberCaps);
        setCaps(currentClassBlockblockMemberCaps);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner, currentClass]);

  useEffect(() => {
    if (!caps) return;

    caps.sort((a, b) => b.club_class - a.club_class);
    setCurrentClassMemberCap(caps[0]);
  }, [caps]);

  return {
    currentClassMemberCap,
    caps,
    isPending,
    error,
  };
};
