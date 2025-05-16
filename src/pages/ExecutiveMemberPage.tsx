import NextRecuritingClass from "@/pages-component/NextRecruitingClass";
import NextClubClass from "@/pages-component/NextClubClass";
import ExecutiveMemberTicketSender from "@/pages-component/ExecutiveMemberTicketSender";
import { useGetExecutiveMemberCap } from "@/hooks/executive-member";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";

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

      {caps && caps[0].member_type === "President" && (
        <ExecutiveMemberTicketSender />
      )}
      <br />
      <NextRecuritingClass></NextRecuritingClass>
      <br />
      <NextClubClass></NextClubClass>
    </section>
  );
}
