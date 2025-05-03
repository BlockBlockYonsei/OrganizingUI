import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";

export const useGetMyCollections = ({ owner }: { owner: string }) => {
  const [toothbrusings, setToothBrushings] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
  const COL_CAP_TYPE = `${PACKAGE_ID}::contract::toothbrusing`;

  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  useEffect(() => {
    client
      .getOwnedObjects({
        owner,
        filter: { StructType: COL_CAP_TYPE },
        options: {
          showType: true,
          showContent: true,
        },
      })
      .then((data) => {
        console.log(data);
        setToothBrushings(data);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner]);

  return {
    toothbrusings,
    isPending,
    error,
  };
};
