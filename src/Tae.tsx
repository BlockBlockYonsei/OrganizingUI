import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { Transaction } from "@mysten/sui/transactions";
import { useGetExecutiveMemberCap } from "./hooks/members";
import { BLOCKBLOCK_YONSEI, FIRST_CLUB_CLASS, PACKAGE_ID } from "./Constant";
import { useEffect, useState } from "react";

export default function Tae() {
  const [pCap, setPCap] = useState("");
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { caps } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });

  useEffect(() => {
    if (caps) {
      const presidentCap = caps.data[0];
      // console.log("president", presidentCap);
      setPCap(caps.data[0].data?.content?.fields?.id?.id);
    }
  }, [caps]);

  useEffect(() => {
    console.log("P Cap", pCap);
  }, [pCap]);

  return (
    <div>
      <div>Taewon</div>
      {account && pCap && (
        <Button
          className="border-2 border-black"
          onClick={() => {
            console.log("button clicked");
            const tx = new Transaction();
            tx.moveCall({
              target: `${PACKAGE_ID}::blockblock::send_executive_member_ticket`,
              typeArguments: [`${PACKAGE_ID}::executive_member::VicePresident`],
              arguments: [
                tx.object(BLOCKBLOCK_YONSEI),
                tx.object(FIRST_CLUB_CLASS),
                tx.object(pCap),
                tx.pure.address(account?.address),
              ],
            });
            signAndExecuteTransaction(
              { transaction: tx },
              {
                onSuccess: (data) => {
                  console.log(data);
                },
                onError: (err) => {
                  console.log("Error", err);
                },
              }
            );
          }}
        >
          send_executive_member_ticket
        </Button>
      )}
      {caps && <div>{JSON.stringify(caps)}</div>}
    </div>
  );
}
