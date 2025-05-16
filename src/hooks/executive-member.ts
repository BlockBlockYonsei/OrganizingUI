import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";
import { useGetCurrentClass } from "./club";
import { ExecutiveMember } from "@/types/executive-member";

export const useGetExecutiveMemberCap = ({ owner }: { owner: string }) => {
  const [caps, setCaps] = useState<ExecutiveMember[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${PACKAGE_ID}::executive_member::ExecutiveMemberCap`;

  const { currentClass } = useGetCurrentClass();

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
        console.log("FilteredData", currentClassExecutiveMemberCaps);
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
  const [caps, setCaps] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${PACKAGE_ID}::blockblock_member::BlockblockMemberCap`;

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
        setCaps(data);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner]);

  return {
    caps,
    isPending,
    error,
  };
};
