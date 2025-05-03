import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Button } from "./components/ui/button";
import { Transaction } from "@mysten/sui/transactions";
import { useGetExecutiveMemberCap } from "./hooks/president";

export default function Tae() {
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { caps } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });
  return (
    <div>
      <div>Taewon</div>
      <Button
        className="border-2 border-black"
        onClick={() => {
          console.log("button clicked");
          const tx = new Transaction();
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
        Button
      </Button>
      {caps && <div>{JSON.stringify(caps)}</div>}
    </div>
  );
}
