import NextRecuritingClass from "@/pages-component/NextRecruitingClass";
import NextClubClass from "@/pages-component/NextClubClass";
import ExecutiveMemberTicketSender from "@/pages-component/ExecutiveMemberTicketSender";

export default function ExecutiveMemberPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-10 text-white">운영진 페이지</h1>

      <ExecutiveMemberTicketSender />
      <br />
      <NextRecuritingClass></NextRecuritingClass>
      <br />
      <NextClubClass></NextClubClass>
    </section>
  );
}
