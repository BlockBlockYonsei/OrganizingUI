
import ExecutiveMember from "@/pages-component/ExecutiveMember";
import NextRecuritingClass from "@/pages-component/NextRecuritingClass";
import NextClubClass from "@/pages-component/NextClubClass";
import NextPresidentClass from "@/pages-component/NextPresidentClass";


export default function PresidentPage() {
  return (
    <section className="p-12">
      <h2 className="text-3xl font-bold mb-10 text-white">President Page</h2>
      <ExecutiveMember></ExecutiveMember>
      
      <NextRecuritingClass></NextRecuritingClass>
      <NextClubClass></NextClubClass>
      <NextPresidentClass></NextPresidentClass>
    </section>
  );
}
