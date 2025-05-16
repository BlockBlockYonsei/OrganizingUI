import CurrentClassRecruiting from "@/pages-component/CurrentClassRecruiting";
import NextClubVoting from "@/pages-component/NextClubVoting";
import ExecutiveMemberInvitation from "@/pages-component/ExecutiveMemberInvitation";
import { useGetExecutiveMemberCap } from "@/hooks/executive-member";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";
import PresidentInvitation from "@/pages-component/PresidentInvitation";

export default function ExecutiveMemberPage() {
  const account = useCurrentAccount();
  const { caps } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });

  useEffect(() => {
    // console.log("coapapapa", caps);
  }, [caps]);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-10 text-white">
        운영진 페이지 {`(${caps[0] ? caps[0].member_type : "Loading..."})`}
      </h1>

      {caps[0] && caps[0].member_type === "President" && (
        <ExecutiveMemberInvitation />
      )}
      <br />
      {caps[0] && caps[0].member_type === "President" && (
        <CurrentClassRecruiting />
      )}
      <br />
      {caps[0] &&
        ["President", "VicePresident", "Treasurer"].includes(
          caps[0].member_type
        ) && <NextClubVoting />}
      <br />
      {caps[0] && caps[0].member_type === "President" && (
        <PresidentInvitation />
      )}
    </section>
  );
}
