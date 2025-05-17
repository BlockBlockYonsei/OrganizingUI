import WalletButton from "@/components/layout/WalletButton";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";

export default function OverviewPage() {
  const account = useCurrentAccount();
  return (
    <div>
      <h1>지갑 연결 페이지</h1>

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
        <div className="w-45">
          <WalletButton />
        </div>
      )}
    </div>
  );
}
