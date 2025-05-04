import { useEffect } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  useGetExecutiveMemberCap,
  useGetMemberCap,
} from "./hooks/executive-member";
import MemberManagement from "./components/members/MemberManagement";

function App() {
  const account = useCurrentAccount();

  const { caps: eMemberCap } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });
  const { caps: memberCap } = useGetMemberCap({
    owner: account ? account.address : "",
  });

  useEffect(() => {
    console.log("e caps", eMemberCap);
  }, [eMemberCap]);

  useEffect(() => {
    console.log("normal caps", memberCap);
  }, [memberCap]);

  return (
    <>
      <MemberManagement />
    </>
  );
}

export default App;
