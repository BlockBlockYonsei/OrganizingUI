import NextClubClass from "@/pages-component/NextClubClass";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useGetCreateNewClassEvents } from "@/hooks/club";
import { useGetExecutiveMemberCap } from "@/hooks/executive-member";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";

export default function PresidentPage() {
  const account = useCurrentAccount();

  const {} = useGetCreateNewClassEvents();

  const { caps } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });

  useEffect(() => {
    console.log("executive Member Cap", caps);
  }, [caps]);
  const [roles, setRoles] = useState({
    president: false,
    vpresident: false,
    treasurer: false,
  });

  const allDone = Object.values(roles).every(Boolean);

  const toggleRole = (key: keyof typeof roles) => {
    setRoles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleArrowClick = () => {
    console.log("화살표 클릭됨");
  };

  return (
    <section className="p-12">
      <h2 className="text-3xl font-bold mb-10 text-white">President Page</h2>
      <NextClubClass></NextClubClass>
    </section>
  );
}
