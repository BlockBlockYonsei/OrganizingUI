import { usePresident } from "@/hooks/president";
import ExecutiveMember from "@/pages-component/ExecutiveMember";
import NextRecuritingClass from "@/pages-component/NextRecuritingClass";
import NextClubClass from "@/pages-component/NextClubClass";

import { useCurrentAccount } from "@mysten/dapp-kit";

export default function PresidentPage() {
  const account = useCurrentAccount();
  const {} = usePresident({
    owner: account ? account.address : "",
  });
  return (
    <section className="p-12">
      <h2 className="text-3xl font-bold mb-10 text-white">President Page</h2>
      <ExecutiveMember></ExecutiveMember>

      <NextClubClass></NextClubClass>
    </section>
  );
}
