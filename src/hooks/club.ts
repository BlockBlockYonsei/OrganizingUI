import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE_ID } from "@/Constant";

export const useGetCurrentClubClass = ({ owner }: { owner: string }) => {
  const [clubClass, setClubClass] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const TYPE = `${PACKAGE_ID}::club_class::CurrentClub`;

  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  useEffect(() => {
    client
      .getOwnedObjects({
        owner,
        filter: { StructType: TYPE },
        options: {
          showType: true,
          showContent: true,
        },
      })
      .then((data) => {
        setClubClass(data);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner]);

  return {
    clubClass,
    isPending,
    error,
  };
};
