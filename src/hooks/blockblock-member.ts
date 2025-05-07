import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";

export const useGetBlockblockMemberCap = ({ owner }: { owner: string }) => {
  const [caps, setCaps] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const CAP_TYPE = `${PACKAGE_ID}::blockblock_member::MemberCap`;

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
        // CurrentClass 로 한 번 필터링 해주  면 좋겠 다
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
