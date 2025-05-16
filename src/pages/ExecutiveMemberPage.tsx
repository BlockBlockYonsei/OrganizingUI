import CurrentClassRecruiting from "@/pages-component/CurrentClassRecruiting";
import NextClubVoting from "@/pages-component/NextClubVoting";
import ExecutiveMemberInvitation from "@/pages-component/ExecutiveMemberInvitation";
import { useGetExecutiveMemberCap } from "@/hooks/members";
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
      {caps &&
        caps.map((cap) => (
          <div>
            <h1 className="text-3xl font-bold mb-10 text-white">
              운영진 페이지 {`(${cap ? cap.member_type : "Loading..."})`}
            </h1>

            {cap && cap.member_type === "President" && (
              <ExecutiveMemberInvitation />
            )}
            <br />
            {cap && cap.member_type === "President" && (
              <CurrentClassRecruiting />
            )}
            <br />
            {cap &&
              ["President", "VicePresident", "Treasurer"].includes(
                cap.member_type
              ) && <NextClubVoting memberCap={cap} />}
            <br />
            {cap && cap.member_type === "President" && <PresidentInvitation />}
          </div>
        ))}
    </section>
  );
}
