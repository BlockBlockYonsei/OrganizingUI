import CurrentClassRecruiting from "@/pages-component/CurrentClassRecruiting";
import NextClubVoting from "@/pages-component/NextClubVoting";
import ExecutiveMemberInvitation from "@/pages-component/ExecutiveMemberInvitation";
import { useGetExecutiveMemberCap } from "@/hooks/members";
import { useCurrentAccount } from "@mysten/dapp-kit";
import PresidentInvitation from "@/pages-component/PresidentInvitation";

export default function ExecutiveMemberPage() {
  const account = useCurrentAccount();
  const { caps } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });

  return (
    <section>
      {caps &&
        caps.map((cap) => (
          <div>
            <h1 className="text-3xl font-bold text-white">
              운영진 페이지 {`(${cap ? cap.member_type : "Loading..."})`}
            </h1>

            <hr className="my-2" />
            <br />

            {cap && cap.member_type === "President" && (
              <div>
                <ExecutiveMemberInvitation />
                <br />
                <CurrentClassRecruiting />
                <br />
                <NextClubVoting memberCap={cap} />
                <br />
                <PresidentInvitation />
              </div>
            )}

            {cap &&
              ["VicePresident", "Treasurer"].includes(cap.member_type) && (
                <NextClubVoting memberCap={cap} />
              )}
            <br />
          </div>
        ))}
    </section>
  );
}
