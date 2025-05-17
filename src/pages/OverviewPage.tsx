import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetCurrentClass } from "@/hooks/club";

export default function OverviewPage() {
  const { currentClass } = useGetCurrentClass();
  return (
    <div>
      {currentClass && (
        <Card className="w-150">
          <CardHeader>
            <CardTitle>
              Current Blockblock Class: {currentClass.class}
            </CardTitle>
            <CardDescription className="truncate">
              ID: {currentClass.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 rounded-md p-2">
              <CardTitle>Blockblock Members: </CardTitle>
              {currentClass.members.map((member) => (
                <CardDescription className="truncate">{member}</CardDescription>
              ))}
            </div>
            <div className="border-2 rounded-md p-2">
              {currentClass.recruitment ? (
                <div>
                  <CardTitle>Recruitment: Registration Open</CardTitle>
                  <h3>Applicant Addresses: </h3>
                  {currentClass.recruitment.addresses.map((address) => (
                    <CardDescription>{address}</CardDescription>
                  ))}
                </div>
              ) : (
                <CardTitle>Recruitment: Registration Closed</CardTitle>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      <br />

      {/* {account ? (
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
      )} */}
    </div>
  );
}
