import NextRecuritingClass from "@/pages-component/NextRecuritingClass";
import NextClubClass from "@/pages-component/NextClubClass";
import ExecutiveMemberTicketSender from "@/pages-component/ExecutiveMemberTicketSender";

export default function ExecutiveMemberPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-10 text-white">운영진 페이지</h1>

      <ExecutiveMemberTicketSender />
      <NextRecuritingClass></NextRecuritingClass>
      <NextClubClass></NextClubClass>
    </section>
  );
}
