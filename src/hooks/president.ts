import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useGetCurrentClass } from "./club";
import { PACKAGE_ID } from "@/Constant";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";

export function usePresident({ owner }: { owner: string }) {
  const [presidentCap, setPresidentCap] = useState();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  // const {
  //   collection: { refetch },
  // } = useContext(CollectionContext);
  // const { setToastState } = useToast();
  const CAP_TYPE = `${PACKAGE_ID}::executive_member::ExecutiveMemberCap`;

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
        console.log("president", data);
        // CurrentClass 로 한 번 필터링 해주  면 좋겠 다
        // setPresidentCap(data);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner]);

  const { currentClass } = useGetCurrentClass();

  const sendExecutiveMemberTicket = ({
    collectionName,
    bannerImgURL,
    description,
    layers,
  }: {
    collectionName: string;
    bannerImgURL: string;
    description: string;
    layers: string[];
  }) => {
    if (!account) return;
    // setToastState({
    //   type: "loading",
    //   message: "Collection is being created...",
    // });
    if (!currentClass) return;

    const tx = new Transaction();
    const [col, cap] = tx.moveCall({
      package: PACKAGE_ID,
      module: "collection",
      function: "send_executive_member_ticket",
      arguments: [
        tx.object(currentClass.blockblock_ys),
        tx.object(currentClass.id),
        tx.pure.string(collectionName),
      ],
    });

    layers.forEach((layer) => {
      tx.moveCall({
        package: PACKAGE_ID,
        module: "collection",
        function: "add_layer_type",
        arguments: [tx.object(col), tx.object(cap), tx.pure.string(layer)],
      });
    });

    tx.moveCall({
      package: PACKAGE_ID,
      module: "collection",
      function: "add_config_to_type",
      typeArguments: [`${PACKAGE_ID}::collection::BaseType`],
      arguments: [
        tx.object(col),
        tx.object(cap),
        tx.pure.string(collectionName),
        tx.pure.string("img_url"),
        tx.pure.string(bannerImgURL),
      ],
    });

    tx.moveCall({
      package: PACKAGE_ID,
      module: "collection",
      function: "add_config_to_type",
      typeArguments: [`${PACKAGE_ID}::collection::BaseType`],
      arguments: [
        tx.object(col),
        tx.object(cap),
        tx.pure.string(collectionName),
        tx.pure.string("description"),
        tx.pure.string(description),
      ],
    });

    tx.moveCall({
      package: "0x2",
      module: "transfer",
      function: "public_share_object",
      typeArguments: [`${PACKAGE_ID}::collection::Collection`],
      arguments: [tx.object(col)],
    });

    tx.transferObjects([cap], tx.pure.address(account.address));

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
    // createCollection,
  };
}
