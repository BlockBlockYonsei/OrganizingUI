import ExecutiveMember from "@/pages-component/ExecutiveMember";
import NextClubClass from "@/pages-component/NextClubClass";

export default function PresidentPage() {
  return (
    <section className="p-12">
      <h2 className="text-3xl font-bold mb-10 text-white">President Page</h2>
      <ExecutiveMember></ExecutiveMember>

      <NextClubClass></NextClubClass>
    </section>
  );
}
