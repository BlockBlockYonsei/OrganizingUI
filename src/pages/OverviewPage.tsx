import WalletButton from "@/components/layout/WalletButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentClass, useGetCurrentClass } from "@/hooks/club";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";

export default function OverviewPage() {
  const account = useCurrentAccount();
  const { currentClass } = useGetCurrentClass();
  return (
    <div>
      {currentClass && (
        <Card className="w-90">
          <CardHeader>
            <CardTitle>Current Club Class: {currentClass.class}</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(currentClass).map(([name, value]) => {
              if (name === "recruitment")
                return (
                  <CardTitle className="truncate w-full">
                    {name}: {JSON.stringify(value)}
                  </CardTitle>
                );
              return (
                <CardTitle className="truncate">
                  {name}: {value}
                </CardTitle>
              );
            })}
          </CardContent>
        </Card>
      )}
      <br />

      {account ? (
        <div className="flex gap-4">
          <Link to="/non-member">
            <button className="border px-4 py-2 cursor-pointer active:bg-gray-700">
              비동아리원 페이지
            </button>
          </Link>
          <Link to="member">
            <button className="border px-4 py-2 cursor-pointer active:bg-gray-700">
              동아리원 페이지
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>지갑 연결 페이지</h1>
          <div className="w-45">
            <WalletButton />
          </div>
        </div>
      )}
    </div>
  );
}
